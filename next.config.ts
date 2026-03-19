import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	images: {
		unoptimized: true,
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
					{ key: "Access-Control-Allow-Headers", value: "Content-Type" },
				],
			},
		];
	},
};

export default nextConfig;
