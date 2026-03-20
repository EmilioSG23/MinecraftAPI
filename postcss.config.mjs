/** @type {import('postcss-load-config').Config} */
/** PostCSS pipeline required to compile Tailwind CSS 4 styles. */
const config = {
	plugins: {
		"@tailwindcss/postcss": {},
	},
};

export default config;
