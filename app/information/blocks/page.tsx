/** Blocks information route. */
import { Layout } from "@/shared/layout/Layout";
import { BlocksInformationClient } from "@/features/information/entry/BlocksInformationClient";
import type { Metadata } from "next";

/** SEO metadata for the blocks page. */
export const metadata: Metadata = {
	title: "Blocks - Minecraft API",
	description: "Browse all Minecraft blocks with properties and API endpoints.",
};

/**
 * Renders the blocks catalogue page.
 *
 * @returns Layout-wrapped blocks client view.
 */
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

