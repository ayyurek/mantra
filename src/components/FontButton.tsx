import { MouseEventHandler } from "react";

type FontButtonProps = {
	font: string;
	isSelected: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export const FontButton: React.FC<FontButtonProps> = ({ font, isSelected, onClick }) => {
	const background = isSelected ? "bg-font-button-pressed" : "bg-font-button-normal";

	return (
		<div className={`group relative mx-4 rounded-full p-px  bg-fill bg-center bg-no-repeat ${background}`}>
			<button
				className={`w-24 h-24 text-3xl text-center rounded-full ${
					isSelected ? "shadow-xl" : ""
				} ${font} text-black text-center`}
				onClick={onClick}
			>
				Ff
			</button>
		</div>
	);
};

export default FontButton;
