/** Information index route that links all entity sections. */
import { DATAS_TYPE } from "@/utils/consts";
import { InformationPageClient } from "@/views/information/InformationPageClient";
import type { Metadata } from "next";

/** SEO metadata for the information hub route. */
export const metadata: Metadata = {
	title: "Information - Minecraft API",
	description: "Explore all Minecraft API information sections.",
};

/**
 * Renders the information hub and publishes JSON-LD for the listed entity sections.
 *
 * @returns Information landing page content.
 */
export default function InformationPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft API Information",
		description: "Explore all Minecraft API information sections.",
		url: "/information",
	};

	const itemListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: Object.values(DATAS_TYPE).map((entity, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: entity,
			url: `/information/${entity}`,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>
			<InformationPageClient />
		</>
	);
}
