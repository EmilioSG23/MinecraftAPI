/** Mobs information route. */
import { Layout } from "@/shared/layout/Layout";
import { MobsInformationClient } from "@/features/information/entry/MobsInformationClient";
import type { Metadata } from "next";

/** SEO metadata for the mobs page. */
export const metadata: Metadata = {
	title: "Mobs - Minecraft API",
	description: "Browse all Minecraft mobs with behavior and API endpoints.",
};

/**
 * Renders the mobs catalogue page.
 *
 * @returns Layout-wrapped mobs client view.
 */
export default function MobsPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft Mobs",
		description: "Browse all Minecraft mobs with behavior and API endpoints.",
		url: "/information/mobs",
	};

	return (
		<Layout>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<MobsInformationClient />
		</Layout>
	);
}

