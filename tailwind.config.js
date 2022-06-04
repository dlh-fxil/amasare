const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
module.exports = {
	content: ["./src/**/*.js"],
	darkMode: "media",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Nunito", ...defaultTheme.fontFamily.sans],
			},
			lineClamp: {
				7: "7",
				8: "8",
				9: "9",
				10: "10",
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
		},
	},
	plugins: [
		// require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
		plugin(function ({ addVariant }) {
			addVariant("scrollbar", "&::-webkit-scrollbar");
			addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");
			addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
			addVariant(
				"supports-scrollbars",
				"@supports selector(::-webkit-scrollbar)",
			);
		}),
	],
};
