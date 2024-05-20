import { MantraContext } from "@/context/MantraContext";
import { LineHeightRatio, StickerInfo, StickerProperties } from "@/util/StickerProps";
import React, { useContext, useEffect, useRef } from "react";

type StickerProps = {
	mantra: string;
	isSelected: boolean;
	font: string;
	sticker: StickerInfo;
	onClick: () => void;
	sizing: StickerProperties;
	containerScale: number;
};

const YellowBackgroundGradient = "linear-gradient(to bottom, #FFF252 , #FFFFFF)"; //YELLOW
const GreenBackgroundGradient = "linear-gradient(to bottom, #67EF7A , #FFFFFF)"; //GREEN
const BlueBackgroundGradient = "linear-gradient(to bottom, #4298f9 , #FFFFFF)"; //BLUE

const BackgroundGradient = BlueBackgroundGradient;

const Sticker: React.FC<StickerProps> = ({ mantra, isSelected, font, sticker, onClick, sizing, containerScale }) => {
	const { setFontSize } = useContext(MantraContext);
	const border = isSelected
		? "shadow-[0_0_0_25px_rgba(255,255,255,1),-25px_55px_25px_rgba(0,0,0,0.5)] "
		: "shadow-[0_0_0_2px_rgba(255,255,255,1),-4px_10px_15px_rgba(0,0,0,0.5)] ";

	const textSpanRef = useRef<HTMLSpanElement>(null);
	const maxFontSize = 24;

	useEffect(() => {
		if (textSpanRef.current) {
			let currentFontSize = maxFontSize;
			textSpanRef.current.style.fontSize = `${currentFontSize}px`;

			while (
				(textSpanRef.current.scrollHeight > textSpanRef.current.offsetHeight ||
					textSpanRef.current.scrollWidth > textSpanRef.current.offsetWidth) &&
				currentFontSize > 12
			) {
				currentFontSize--;
				textSpanRef.current.style.fontSize = `${currentFontSize}px`;
				textSpanRef.current.style.lineHeight = `${currentFontSize * LineHeightRatio}px`;
			}
			if (isSelected) {
				setFontSize(currentFontSize);
			}
		}
	}, [textSpanRef, font, maxFontSize, isSelected, setFontSize]);

	return (
		<div
			className={`absolute rounded-full transition-all duration-500 ease-in-out`}
			style={{
				left: `${sizing.left * containerScale}px`,
				top: `${sizing.top * containerScale}px`,
				transform: `scale(${sizing.scale * containerScale})`,
				zIndex: isSelected ? 10 : undefined,
			}}
			onClick={onClick}
		>
			<div
				className="absolute rounded-full w-64 h-64"
				style={{
					backgroundImage: BackgroundGradient,
				}}
			/>
			<div
				className={`absolute flex items-center w-64 h-64 justify-center ${font} ${sticker.border} bg-fill bg-center bg-no-repeat`}
			>
				<span
					ref={textSpanRef}
					className={`flex text-center text-black justify-center items-center`}
					style={{
						fontSize: `${maxFontSize}px`,
						lineHeight: `${maxFontSize * 1.3}px`,
						width: `${sticker.textBox.width}px`,
						height: `${sticker.textBox.height}px`,
					}}
				>
					{mantra}
				</span>
				<div className={`absolute w-64 h-64 rounded-full ${border} transition-all ease-in-out duration-500`}></div>
			</div>
		</div>
	);
};

export default Sticker;
