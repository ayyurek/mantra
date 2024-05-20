import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useScreensaver(delayInSeconds: number = 30) {
	const router = useRouter();
	const [lastInteraction, setLastInteraction] = useState(Date.now());

	const poke = () => {
		setLastInteraction(Date.now());
	};

	useEffect(() => {
		let isMounted = true; // Flag to track if component is mounted

		let latestTimeout: any;

		// Function to set a random timeout
		const loopedTimeout = () => {
			const timeoutDuration = 1000; // Random timeout between 1000ms (1s) and 6000ms (6s)
			latestTimeout = setTimeout(() => {
				if (isMounted) {
					const currentTimeInMillis = Date.now();
					if (currentTimeInMillis - lastInteraction > delayInSeconds * 1000) {
						router.push("/");
					} else {
						loopedTimeout();
					}
				}
			}, timeoutDuration);
		};

		loopedTimeout(); // Initialize the loop

		// Cleanup function to clear the timeout when component unmounts or dependencies change
		return () => {
			isMounted = false;
			if (latestTimeout) {
				clearTimeout(latestTimeout);
			}
		};
	}, [delayInSeconds, lastInteraction, router]);

	return { poke };
}
