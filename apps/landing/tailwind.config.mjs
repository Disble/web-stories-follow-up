import sharedConfig from "@repo/ui/tailwind.config.ts";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	presets: [sharedConfig],
	plugins: [],
}
