import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PrintButtonProps = {
	mantra: string;
	stickerIndex: number;
	font: string;
	fontSize: number;
	scale: number;
};

const PrintButton: React.FC<PrintButtonProps> = ({ mantra, font, stickerIndex, fontSize, scale }) => {
	// State to manage whether the button is enabled
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	// Error Routing
	const [error, setError] = useState<string | null>(null);

	// Success message for after a successful print
	const [success, setSuccess] = useState<boolean>(false);

	// Disable button during printing
	const [disabled, setDisabled] = useState<boolean>(false);

	const router = useRouter();

	const handleGenerateAndDownloadPDF = async () => {
		setDisabled(true);
		try {
			const response = await fetch("/api/print", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					mantra,
					font,
					stickerIndex,
					fontSize,
				}),
			});

			if (response.ok) {
				setSuccess(true);
				setTimeout(() => router.push("/"), 3000);
			} else {
				setDisabled(false);
				const errorResponse = await response.text();
				setError(errorResponse.length > 0 ? errorResponse : "An error occurred.");
				setTimeout(() => setError(null), 3000); //clear error message after 3 seconds
			}
		} catch (e) {
			setDisabled(false);
			console.error("Error:", e);
			setError("An error occurred.");
			setTimeout(() => setError(null), 3000); //clear error message after 3 seconds
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsButtonEnabled(true);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className="flex flex-col relative justify-center items-center mb-4 md:mb-8 lg:mb-12"
			style={{
				transform: `scale(${scale})`,
			}}
		>
			<button
				// Slight delay before active so user can’t double click from previous screen
				disabled={!isButtonEnabled || disabled}
				onClick={handleGenerateAndDownloadPDF}
				className="text-3xl border-2 px-12 py-4 my-4 rounded-full border-innov-blue-900 text-innov-blue-900 font-medium disabled:text-innov-blue-900/50 enabled:hover:bg-innov-blue-100/50 transition-colors"
				style={{
					backgroundImage: "linear-gradient(to bottom, #4298f9 30%, white)", //Still waiting on JG input for this button
				}}
			>
				Print
			</button>
			{error && (
				<div className="absolute translate-y-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
					{error}
				</div>
			)}
			{success && (
				<div className="absolute translate-y-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
					Grab your sticker!
				</div>
			)}
		</div>
	);
};

export default PrintButton;
