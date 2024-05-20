import { MantraContextProvider } from "@/context/MantraContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// SAS Default Font
const anova = localFont({
	src: "../fonts/Anova-Regular.ttf",
	display: "swap",
	variable: "--font-anova",
});

const brushScript = localFont({
	src: "../fonts/Brush-Script.ttf",
	display: "swap",
	variable: "--font-brush-script",
});

const serif = localFont({
	src: "../fonts/PTSerif-Regular.ttf",
	display: "swap",
	variable: "--font-serif",
});

const appleChancery = localFont({
	src: "../fonts/Apple-Chancery.ttf",
	display: "swap",
	variable: "--font-apple-chancery",
});

const bradleyHand = localFont({
	src: "../fonts/Bradley-Hand.ttf",
	display: "swap",
	variable: "--font-bradley-hand",
});

export const metadata: Metadata = {
	title: "Print Your Mantra",
	description: "Print the mantra you generated using Mantra Maker",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${anova.variable} ${bradleyHand.variable} ${brushScript.variable} ${appleChancery.variable} ${serif.variable} bg-svg-background-blue bg-fill bg-center bg-no-repeat `}
			>
				<MantraContextProvider>{children}</MantraContextProvider>
			</body>
		</html>
	);
}
