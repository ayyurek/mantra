import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/util/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"innov-blue": {
					100: "#4298f9",
					500: "#0466d0",
					900: "#042954",
				},
				"innov-purple": {
					100: "#8066ff",
					500: "#6f1def",
					900: "#430e84",
				},
				"innov-pink": {
					100: "#ff66b2",
					500: "#db137d",
					900: "#860b4a",
				},
				"innov-yellow": {
					100: "#ffde74",
					500: "#ffcc33",
					900: "#d9a30b",
				},
				"innov-green": {
					100: "#a7ff79",
					500: "#7fea38",
					900: "#5bba25",
				},
			},
			backgroundImage: {
				// Page Backgrounds
				"svg-background-blue": "url('/ZenAiBG_Blue-02.png')",
				"svg-background-grey": " url('/ZenAiBG_Grey-01.png')",
				"svg-background-green": " url('/ZenAiBG_Green-03.png')",

				// Sticker Borders
				"mantra-sticker-border-circle": "url('/Stickers01.png')",
				"mantra-sticker-border-petals": "url('/Stickers02.png')",
				"mantra-sticker-border-blank": "url('/Stickers03.png')",
				"mantra-sticker-border-brush": "url('/Stickers04.png')",
				"mantra-sticker-border-thorns": "url('/Stickers05.png')",

				// Font Button outline
				"font-button-outline": "url('/FontButtonOutline.png')",
				"font-button-normal": "url('/whiteTextbutton-01.png')",
				"font-button-pressed": "url('/PressedButton-03.png')",
			},
			// Ensure full coverage without repeating for any background
			backgroundSize: {
				fill: "cover",
			},
			backgroundPosition: {
				center: "center",
			},
			backgroundRepeat: {
				"no-repeat": "no-repeat",
			},
			fontFamily: {
				anova: ["var(--font-anova)"],
				chancery: ["var(--font-apple-chancery)"],
				brush: ["var(--font-brush-script)"],
				bradley: ["var(--font-bradley-hand)"],
				serif: ["var(--font-serif)"],
			},
		},
	},
	plugins: [],
};
export default config;
