module.exports = {
	async rewrites() {
		return [
			{
				source: "/:path*",
				destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/:path*",
			},
		];
	},
};
