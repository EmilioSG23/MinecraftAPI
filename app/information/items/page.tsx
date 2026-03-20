import { Layout } from "@/layout/Layout";
import { ItemsInformationClient } from "@/views/information/ItemsInformationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Items - Minecraft API",
	description: "Browse all Minecraft items with properties and API endpoints.",
};

export default function ItemsPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft Items",
		description: "Browse all Minecraft items with properties and API endpoints.",
		url: "/information/items",
	};

	return (
		<Layout>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ItemsInformationClient />
		</Layout>
	);
}
