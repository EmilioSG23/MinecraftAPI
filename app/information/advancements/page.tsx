/** Advancements information route. */
import { Layout } from "@/layout/Layout";
import { AdvancementsInformationClient } from "@/views/information/AdvancementsInformationClient";
import type { Metadata } from "next";

/** SEO metadata for the advancements page. */
export const metadata: Metadata = {
	title: "Advancements - Minecraft API",
	description: "Browse all Minecraft advancements and API endpoints.",
};

/**
 * Renders the advancements catalogue page.
 *
 * @returns Layout-wrapped advancements client view.
 */
export default function AdvancementsPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft Advancements",
		description: "Browse all Minecraft advancements and API endpoints.",
		url: "/information/advancements",
	};

	return (
		<Layout>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<AdvancementsInformationClient />
		</Layout>
	);
}
