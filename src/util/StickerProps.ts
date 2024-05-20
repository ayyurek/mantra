export type StickerProperties = {
	left: number;
	top: number;
	scale: number;
};

type AllScenarios = StickerProperties[][];

const Scales = {
	xl: 2.254,
	lg: 1.5732,
	md: 1.4732,
	sm: 1.1592,
	xs: 1.0856,
};

// Covering all the different selection scenarios with a position for each sticker in each one
//These numbers are based on a 1080x1920 monitor (using a portion of that) and scaled based on actual dimensions
export const StickerPositions: AllScenarios = [
	[
		{
			scale: Scales.xl,
			left: 160,
			top: 684,
		},
		{
			scale: Scales.lg,
			left: 190,
			top: 194,
		},
		{
			scale: Scales.xs,
			left: 630,
			top: 182,
		},
		{
			scale: Scales.md,
			left: 720,
			top: 463,
		},
		{
			scale: Scales.sm,
			left: 750,
			top: 1100,
		},
	],
	[
		{
			scale: Scales.lg,
			left: 160,
			top: 905,
		},
		{
			scale: Scales.xl,
			left: 160,
			top: 243,
		},
		{
			scale: Scales.sm,
			left: 725,
			top: 91,
		},
		{
			scale: Scales.md,
			left: 720,
			top: 670,
		},
		{
			scale: Scales.xs,
			left: 580,
			top: 1100,
		},
	],
	[
		{
			scale: Scales.lg,
			left: 110,
			top: 630,
		},
		{
			scale: Scales.sm,
			left: 115,
			top: 95,
		},
		{
			scale: Scales.xl,
			left: 455,
			top: 155,
		},
		{
			scale: Scales.md,
			left: 690,
			top: 800,
		},
		{
			scale: Scales.xs,
			left: 370,
			top: 1023,
		},
	],
	[
		{
			scale: Scales.md,
			left: 145,
			top: 920,
		},
		{
			scale: Scales.lg,
			left: 90,
			top: 180,
		},
		{
			scale: Scales.sm,
			left: 780,
			top: 90,
		},
		{
			scale: Scales.xl,
			left: 470,
			top: 440,
		},
		{
			scale: Scales.xs,
			left: 540,
			top: 1110,
		},
	],
	[
		{
			scale: Scales.sm,
			left: 170,
			top: 1080,
		},
		{
			scale: Scales.lg,
			left: 90,
			top: 370,
		},
		{
			scale: Scales.xs,
			left: 340,
			top: 130,
		},
		{
			scale: Scales.md,
			left: 710,
			top: 190,
		},
		{
			scale: Scales.xl,
			left: 460,
			top: 640,
		},
	],
];

export const Fonts = [
	["font-bradley", "./src/fonts/Bradley-Hand.ttf"],
	["font-chancery", "./src/fonts/Apple-Chancery.ttf"],
	["font-anova", "./src/fonts/Anova-Regular.ttf"],
	["font-brush", "./src/fonts/brush-Script.ttf"],
	["font-serif", "./src/fonts/PTSerif-Regular.ttf"],
];

export type StickerInfo = {
	border: string;
	image: string;
	font: string;
	textBox: {
		width: number;
		height: number;
	};
};

export const StickerInfos: StickerInfo[] = [
	{
		border: "bg-mantra-sticker-border-thorns",
		image: "./public/Stickers05.png",
		font: "font-bradley",
		textBox: {
			width: 220,
			height: 100,
		},
	},
	{
		border: "bg-mantra-sticker-border-blank",
		image: "./public/Stickers03.png",
		font: "font-chancery",
		textBox: {
			width: 220,
			height: 120,
		},
	},
	{
		border: "bg-mantra-sticker-border-brush",
		image: "./public/Stickers04.png",
		font: "font-anova",
		textBox: {
			width: 160,
			height: 90,
		},
	},
	{
		border: "bg-mantra-sticker-border-petals",
		image: "./public/Stickers02.png",
		font: "font-brush",
		textBox: {
			width: 220,
			height: 100,
		},
	},
	{
		border: "bg-mantra-sticker-border-circle",
		image: "./public/Stickers01.png",
		font: "font-serif",
		textBox: {
			width: 190,
			height: 90,
		},
	},
];

export const LineHeightRatio = 1.25;
