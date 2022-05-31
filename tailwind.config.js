const defaultTheme = require("tailwindcss/defaultTheme");

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
	],
};
