/** Items information route. */
import { Layout } from "@/layout/Layout";
import { ItemsInformationClient } from "@/views/information/ItemsInformationClient";
import type { Metadata } from "next";

/** SEO metadata for the items page. */
export const metadata: Metadata = {
	title: "Items - Minecraft API",
	description: "Browse all Minecraft items with properties and API endpoints.",
};

/**
 * Renders the items catalogue page.
 *
 * @returns Layout-wrapped items client view.
 */
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
