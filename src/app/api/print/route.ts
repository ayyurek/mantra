import { Fonts, LineHeightRatio, StickerInfos } from "@/util/StickerProps";
import fs from "fs";
import { NextRequest } from "next/server";
import os from "os";
import path from "path";
import { print } from "pdf-to-printer";
import PDFDocument from "pdfkit";

const pdfFileName = "temp_sticker.pdf";

function getFontPath(fontTag: string) {
  const fontEntry = Fonts.find((entry) => entry[0] === fontTag);
  return fontEntry
    ? fontEntry[1]
    : (console.log("Font not found."), "font-anova");
}

//Make sure the executable for printing has been moved to server-chunks
const addPrintExecutable = () => {
  const targetDirectory = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "vendor-chunks"
  );
  const sourceFilePath = path.join(
    "node_modules",
    "pdf-to-printer",
    "dist",
    "SumatraPDF-3.4.6-32.exe"
  );
  const destinationFilePath = path.join(
    targetDirectory,
    "SumatraPDF-3.4.6-32.exe"
  );

  if (!fs.existsSync(destinationFilePath) && os.platform() === "win32") {
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
      if (err) {
        console.error(err);
        throw new Error("Error copying file: ", err);
      }
    });
  }
};

// Helper function to generate a PDF and return it as a buffer
const generatePDFBuffer = async (
  mantra: string,
  font: string,
  stickerIndex: number,
  fontSize: number
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    if (!font || !mantra || typeof stickerIndex !== "number") {
      reject("Font or border pattern not found.");
      return;
    }

    const stickerInfo = StickerInfos[stickerIndex];

    const lineHeight = fontSize * LineHeightRatio;

    // Convert fontsize from pixels to points
    const fontSizePT = fontSize / 1.33;
    const lineHeightPT = lineHeight / 1.33;
    const lineGap = lineHeightPT - fontSizePT;

    var fontPath = getFontPath(font);
    var borderPath = StickerInfos[stickerIndex].image;

    const doc = new PDFDocument({
      size: [216, 216], // 216 points == 3 inches
      margins: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
      font: fontPath,
    });

    // Temporarily write to a file
    const stream = fs.createWriteStream(pdfFileName);
    doc.pipe(stream);

    // Ensure font and border paths were found
    if (!fontPath || !borderPath) {
      reject("Font or border pattern not found.");
      return;
    }

    // Set font and apply border
    doc.font(fontPath).fontSize(fontSizePT).lineGap(lineGap);
    doc.image(borderPath, 0, 0, { width: 216, height: 216 });

    // Horizontal center position
    const mantraWidth = stickerInfo.textBox.width / 1.33;

    // Width of sticker - width of mantra text box, half for padding on either side
    const centerX = (216 - mantraWidth) / 2;

    // Vertical center position
    // Calculate the vertical center position
    const textHeight = doc.heightOfString(mantra, { width: mantraWidth });

    const topY = (216 - textHeight) / 2;

    doc.text(mantra, centerX, topY, {
      width: mantraWidth,
      align: "center"
    });

    doc.end();

    const buffers: Buffer[] = [];
    doc.on("data", (data: Buffer) => buffers.push(data));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);
  });
};

const printPDF = async () => {
  const printerM = "Munbyn_ITPP941";
  const options = {
    printer: printerM,
    paperSize: "3x3"
  };

  const printResponse = await print(pdfFileName, options).then(console.log);
  return printResponse;
};

export async function POST(request: NextRequest) {
  const { mantra, font, stickerIndex, fontSize } = await request.json();

  if (!mantra || typeof mantra !== "string") {
    return new Response("Invalid mantra", { status: 400 });
  }

  const print = process.env.DONT_PRINT !== "true";

  if (print) {
    //move print executable here, if needed, so that it is finished by the time we need it.
    addPrintExecutable();
  }

  try {
    await generatePDFBuffer(mantra, font, stickerIndex, fontSize);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Oh no! There was an issue creating your sticker.", {
      status: 500,
    });
  }

  if (print) {
    try {
      await printPDF();
    } catch (error) {
      console.error("Error printing PDF:", error);
      return new Response("Oh no! There was an issue printing your sticker.", {
        status: 500,
      });
    }
  }

  return new Response("Success generating and printing PDF.", {
    status: 200,
  });
}
