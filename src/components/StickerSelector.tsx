"use client";
import { MantraContext } from "@/context/MantraContext";
import useElementDimensions from "@/hooks/useElementDimensions";
import { StickerInfos, StickerPositions } from "@/util/StickerProps";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import FontPanel from "./FontPanel";
import PrintButton from "./PrintButton";
import Sticker from "./Sticker";

type StickerSelectorProps = {
	poke: () => void;
	mantra: string;
};

export const StickerSelector = ({ poke, mantra }: StickerSelectorProps) => {
	const router = useRouter();
	const { selectedFont, setSelectedFont, stickerIndex, setStickerIndex, fontSize } = useContext(MantraContext);
	const { dimensions, ref } = useElementDimensions();

	const hScale = dimensions ? dimensions.width / 1150 : 1;
	const vScale = dimensions ? dimensions.height / 1500 : 1;
	const scale = hScale < vScale ? hScale : vScale;
	const uiScale = (scale * 2 + 1) / 3; // 2/3s of the way towards the scaling of the bubbles

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex justify-between pt-10 px-10">
				<button
					className="text-xl md:text-2xl lg:text-3xl font-bold pb-2"
					onClick={() => {
						router.push("/print");
					}}
				>
					←
				</button>
				<span className="text-xl md:text-2xl lg:text-3xl text-center text-white">Create Your ZenAI Sticker</span>
				<span className="invisible text-3xl">←</span>
			</div>

			<div className="flex grow items-center flex-col">
				<div className="relative aspect-[4/5] h-full max-w-full" ref={ref}>
					{StickerInfos.map((sticker, index) => (
						<Sticker
							key={index}
							mantra={mantra}
							font={selectedFont ?? sticker.font}
							isSelected={stickerIndex === index}
							sticker={sticker}
							onClick={() => {
								setStickerIndex(index);
								poke();
							}}
							sizing={StickerPositions[stickerIndex][index]}
							containerScale={scale}
						/>
					))}
				</div>
			</div>
			<FontPanel
				onFontChange={(font) => {
					setSelectedFont(font);
					poke();
				}}
				scale={uiScale}
			/>
			<PrintButton
				mantra={mantra}
				stickerIndex={stickerIndex}
				font={selectedFont ?? StickerInfos[stickerIndex].font}
				fontSize={fontSize}
				scale={uiScale}
			/>

			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src="/innovate-logo.png" alt="SAS Innovate Logo" className="w-[200px] mx-auto my-4"></img>
		</div>
	);
};
export default StickerSelector;
