import { Layout } from "@/layout/Layout";
import { BlocksInformationClient } from "@/views/information/BlocksInformationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blocks - Minecraft API",
	description: "Browse all Minecraft blocks with properties and API endpoints.",
};

export default function BlocksPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft Blocks",
		description: "Browse all Minecraft blocks with properties and API endpoints.",
		url: "/information/blocks",
	};

	return (
		<Layout>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<BlocksInformationClient />
		</Layout>
	);
}
