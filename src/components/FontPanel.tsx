import { Fonts } from "@/util/StickerProps";
import React, { useState } from "react";
import FontButton from "./FontButton";

type FontPanelProps = {
	onFontChange: (font: string | undefined) => void;
	scale: number;
};

export const FontPanel: React.FC<FontPanelProps> = ({ onFontChange, scale }) => {
	const [localSelectedFont, setLocalSelectedFont] = useState<string>();

	const fontChanged = (font: string) => {
		const newFont = font === localSelectedFont ? undefined : font;
		setLocalSelectedFont(newFont);
		onFontChange(newFont);
	};

	return (
		<div
			className="flex justify-center items-center pt-1"
			style={{
				transform: `scale(${scale})`,
			}}
		>
			{Fonts.map((font, index) => (
				<FontButton
					key={index}
					font={font[0]}
					isSelected={localSelectedFont === font[0]}
					onClick={() => fontChanged(font[0])}
				/>
			))}
		</div>
	);
};

export default FontPanel;
