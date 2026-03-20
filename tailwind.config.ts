/** Tailwind CSS configuration used by both App Router pages and src components. */
import type { Config } from "tailwindcss";

/** Content globs kept intentionally small because styles live in app and src only. */
const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;
