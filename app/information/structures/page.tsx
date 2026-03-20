import { Layout } from "@/layout/Layout";
import { StructuresInformationClient } from "@/views/information/StructuresInformationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Structures - Minecraft API",
	description: "Browse all Minecraft structures and API endpoints.",
};

export default function StructuresPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft Structures",
		description: "Browse all Minecraft structures and API endpoints.",
		url: "/information/structures",
	};

	return (
		<Layout>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<StructuresInformationClient />
		</Layout>
	);
}
