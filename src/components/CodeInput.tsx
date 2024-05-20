"use client";

import { useMantraContext } from "@/context/MantraContext";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const KeypadArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, 0];
const CodeInputLength = 5;

type CodeInputProps = {
	poke: () => void;
};

export const CodeInput = ({ poke }: CodeInputProps) => {
	const router = useRouter();
	// State to hold code digits as array
	const [code, setCode] = useState<number[]>([]);
	const { setMantra } = useMantraContext();

	// State to handle API Error
	const [error, setError] = useState<string | null>(null);

	let currentIndex = code.findIndex((v) => v === undefined);
	if (currentIndex === -1) {
		currentIndex = code.length;
	}

	const addDigit = (number: number) => {
		setCode((v) => {
			const copy = [...v];
			copy[currentIndex] = number;
			return copy;
		});
		poke();
	};

	const deleteDigit = () => {
		setCode((v) => {
			// Copy Array, pop copy, return copy
			const copy = [...v];
			copy.pop();
			return copy;
		});
		poke();
	};

	//Handle submission of Mantra Code
	const handleMantraCodeSubmit = async () => {
		poke();
		const mantraCode = code.join("");
		try {
			const response = await fetch(`${window.origin}/api/mantra/${mantraCode}`);
			if (response.ok) {
				const parsed = await response.json();
				setMantra(parsed.mantra);
				// navigate to another route
				router.push("/customize");
			} else {
				setCode([]);
				const error = await response.text();
				setError(error.length > 0 ? error : "An error occured");
				setTimeout(() => setError(null), 3000); // Clear the error message after 3 seconds
			}
		} catch (error) {
			setError(typeof error === "string" ? error : "An error occured");
			setTimeout(() => setError(null), 3000); // Clear the error message after 3 seconds
		}
	};

	return (
		<div className="m-2 md:m-4 lg:m-8 text-innov-white border-slate-300 flex flex-col justify-stretch">
			<span className="text-xl md:text-2xl lg:text-3xl my-1 md:my-2 lg:my-4 text-center">Enter Your Mantra ID</span>

			<div className="my-1 md:my-2 lg:my-4 text-center text-4xl md:text-5xl lg:text-6xl">
				{code.length > 0 && code.length < 5 && <span className="invisible">_</span>}
				{code.join("")}
				{code.length < 5 && <span className="animate-pulse">_</span>}
			</div>

			<div className="flex flex-wrap gap-[8px] justify-center max-w-[200px] mx-auto my-2 md:my-4 lg:my-8">
				{KeypadArray.map((v) => {
					if (typeof v === "number") {
						return (
							<CodeInputButton
								key={v}
								number={v}
								onClick={() => {
									addDigit(v);
								}}
								disabled={currentIndex === CodeInputLength}
							/>
						);
					} else {
						return <div className="w-[calc(33.3333333%_-_8px)] aspect-square" key="blank" />;
					}
				})}

				<BackspaceButton onClick={deleteDigit} disabled={currentIndex === 0} />
			</div>
			<div className="flex justify-center items-center mt-2 md:mt-6 lg:mt-10 mb-1 md:mb-2 lg:mb-4">
				<button
					disabled={code.length == 0}
					onClick={handleMantraCodeSubmit}
					className="border-2 px-4 py-2 rounded-full text-white text-xl font-medium disabled:text-white/30 disabled:border-white/30 enabled:hover:bg-innov-blue-100/50 transition-colors"
				>
					Next
				</button>
				{/*Error Handling of response */}
				{error && (
					<div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
						{error}
					</div>
				)}
			</div>
		</div>
	);
};

type CodeInputSlotProps = React.HTMLProps<HTMLButtonElement> & {
	number: number | undefined;
	active: boolean;
};

type CodeInputButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	number: number;
};

const CodeInputButton = ({ number, ...props }: CodeInputButtonProps) => {
	return (
		<button
			className="w-[calc(33.3333333%_-_8px)] aspect-square border-2 rounded-full flex place-content-center place-items-center disabled:text-white/50 disabled:border-white/50 enabled:hover:bg-innov-blue-100/50 active:bg-innov-blue-100/50 transition-colors"
			{...props}
		>
			<span className="text-xl">{number}</span>
		</button>
	);
};

type BackspaceButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

const BackspaceButton = ({ ...props }: BackspaceButtonProps) => {
	return (
		<button
			className="w-[calc(33.3333333%_-_8px)] aspect-square flex place-content-center place-items-center text-white disabled:text-white/30 enabled:hover:bg-innov-blue-100/50"
			{...props}
		>
			<BackspaceIcon className="w-12 h-12 stroke-[1px]" />
		</button>
	);
};
