"use client";
import { StickerSelector } from "@/components/StickerSelector";
import { useScreensaver } from "@/hooks/useScreensaver";
import { disableContextMenu } from "@/util/DisableContextMenu";
import { useMantraContext } from "../../context/MantraContext";

export default function Customize() {
	const { poke } = useScreensaver();
	const { mantra } = useMantraContext();

	return (
		// Background: use gray to white gradient
		<main onContextMenu={disableContextMenu} className="h-screen w-screen">
			<StickerSelector poke={poke} mantra={mantra} />
		</main>
	);
}
