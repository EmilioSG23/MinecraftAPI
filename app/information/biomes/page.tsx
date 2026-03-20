/** Biomes information route. */
import { Layout } from "@/layout/Layout";
import { BiomesInformationClient } from "@/views/information/BiomesInformationClient";
import type { Metadata } from "next";

/** SEO metadata for the biomes page. */
export const metadata: Metadata = {
	title: "Biomes - Minecraft API",
	description: "Browse all Minecraft biomes with weather and API endpoints.",
};

/**
 * Renders the biomes catalogue page.
 *
 * @returns Layout-wrapped biomes client view.
 */
export default function BiomesPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft Biomes",
		description: "Browse all Minecraft biomes with weather and API endpoints.",
		url: "/information/biomes",
	};

	return (
		<Layout>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<BiomesInformationClient />
		</Layout>
	);
}
