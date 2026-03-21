/** Structures information route. */
import { Layout } from "@/layout/Layout";
import { StructuresInformationClient } from "@/pages/information/StructuresInformationClient";
import type { Metadata } from "next";

/** SEO metadata for the structures page. */
export const metadata: Metadata = {
	title: "Structures - Minecraft API",
	description: "Browse all Minecraft structures and API endpoints.",
};

/**
 * Renders the structures catalogue page.
 *
 * @returns Layout-wrapped structures client view.
 */
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
