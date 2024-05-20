import { useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";

const useElementDimensions = <T extends HTMLDivElement>(refreshOnScroll = false) => {
	const ref = useRef<T>(null);
	const [dimensions, setDimensions] = useState<DOMRect | null>(null);

	const refresh = useCallback(() => {
		const domRect = ref.current?.getBoundingClientRect();

		if (domRect) {
			setDimensions(domRect);
		}
	}, []);

	useEventListener("resize", refresh);
	useEventListener("scroll", refreshOnScroll ? refresh : undefined, true);

	return { dimensions, ref, refresh };
};

export default useElementDimensions;
