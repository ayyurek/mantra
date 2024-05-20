"use client";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type ContextValues = {
	mantra: string;
	setMantra: Dispatch<SetStateAction<string>>;
	stickerIndex: number;
	setStickerIndex: Dispatch<SetStateAction<number>>;
	selectedFont: string | undefined;
	setSelectedFont: Dispatch<SetStateAction<string | undefined>>;
	fontSize: number;
	setFontSize: Dispatch<SetStateAction<number>>;
};

export const MantraContext = createContext<ContextValues>({} as ContextValues);

export const MantraContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	// const [mantra, setMantra] = useState<string>(
	// 	"Charge Forward, Unwavering: Let every step be a leap towards greatness."
	// );

	const [stickerIndex, setStickerIndex] = useState<number>(2);
	const [selectedFont, setSelectedFont] = useState<string>();
	const [fontSize, setFontSize] = useState(24);

	// 14 Characters

	// const [mantra, setMantra] = useState<string>("Charge Forward");

	//  48 characters

	// const [mantra, setMantra] = useState<string>("Charge Forward, Let every step be a leap towards");

	// 80 characters

	// const [mantra, setMantra] = useState<string>(
	// 	"Charge Forward, Unwavering: Let every step be a leap towards greatness. leap towards greatness."
	// );

	// 126 characters

	// const [mantra, setMantra] = useState<string>(
	// 	"Lorem Ipsum,non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus"
	// );

	const [mantra, setMantra] = useState<string>(
		"Precision in Data: Elevate analysis accuracy, embody statistical excellence, and streamline organization for impactful insights."
	);

	return (
		<MantraContext.Provider
			value={{
				mantra,
				setMantra,
				stickerIndex,
				setStickerIndex,
				selectedFont,
				setSelectedFont,
				fontSize,
				setFontSize,
			}}
		>
			{children}
		</MantraContext.Provider>
	);
};

export function useMantraContext() {
	const context = useContext(MantraContext);
	if (context === undefined) {
		throw new Error("useMantra must be used within a MantraContextProvider");
	}
	return context;
}
