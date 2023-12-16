/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./public/index.html',
	],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		preflight: true,
		container: true,
	},
};
