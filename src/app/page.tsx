"use client";

import { disableContextMenu } from "@/util/DisableContextMenu";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const goToPrint = () => {
		router.push("/print");
	};
	return (
		<main
			onContextMenu={disableContextMenu}
			className="h-screen w-screen flex flex-col justify-between items-center"
			onClick={goToPrint}
		>
			<span className="text-3xl md:text-4xl text-center text-white pt-20">Create Your ZenAI Sticker</span>
			<div className="flex justify-center items-center flex-col grow">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className="max-h-[50vh]" src="/screensaver.gif" alt="Looping Zen AI logo" />
				<span className="text-3xl">Touch to continue</span>
			</div>
			{/* Spacer to match the title and keep the animation centered */}
			<span className="pt-40" />
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src="/innovate-logo.png" className="w-[200px] h-[25px] my-4" alt="SAS Innovate Logo" />
		</main>
	);
}
