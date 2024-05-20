"use client";

import { CodeInput } from "@/components/CodeInput";
import { useScreensaver } from "@/hooks/useScreensaver";
import { disableContextMenu } from "@/util/DisableContextMenu";
import QRCode from "react-qr-code";

export default function Home() {
	const { poke } = useScreensaver();
	return (
		<main onContextMenu={disableContextMenu} className="h-screen w-screen justify-between flex flex-col">
			<span className="text-2xl md:text-3xl lg:text-4xl text-center text-white pt-4 md:pt-10 lg:pt-20">
				Create Your ZenAI Sticker
			</span>
			{/* empty space to balance bottom text / qr code */}
			<span className="h-0 md:h-[120px] lg:h-[176px]"></span>
			<div className=" flex justify-center items-center flex-col">
				<CodeInput poke={poke} />
			</div>
			<div className="flex justify-between items-center flex-col">
				<span className="text-lg md:text-xl lg:text-2xl text-center text-white my-2">
					Don&apos;t have a ZenAI Mantra?
				</span>
				<div className="p-2 mt-1 md:mt-4 lg:mt-8 mb-2 bg-white flex justify-center">
					<QRCode value={"https://curiosity.sas.com/app/xpe/mantra"} size={120} />
				</div>
				<a
					href="https://sas.com/zenai"
					target="_blank"
					className="text-lg md:text-xl lg:text-2xl text-center text-white hover:underline"
				>
					sas.com/zenai
				</a>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src="/innovate-logo.png" className="w-[200px] mx-auto mt-1 md:mt-2 lg:mt-4 mb-2" alt="SAS Innovate Logo" />
		</main>
	);
}
