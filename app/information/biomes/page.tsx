/** Biomes information route. */
import { BiomesInformationClient } from "@/features/information/entry/BiomesInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Layout } from "@/shared/layout/Layout";
import type { Metadata } from "next";

/** SEO metadata for the biomes page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Biomes",
	description: "Browse all Minecraft biomes with weather and API endpoints.",
	path: "/information/biomes",
	pageName: "Minecraft Biomes",
});

/**
 * Renders the biomes catalogue page.
 *
 * @returns Layout-wrapped biomes client view.
 */
export default function BiomesPage() {
	return (
		<Layout>
			{renderInformationRoute(
				{
					title: "Biomes",
					description: "Browse all Minecraft biomes with weather and API endpoints.",
					path: "/information/biomes",
					pageName: "Minecraft Biomes",
				},
				<BiomesInformationClient />,
			)}
		</Layout>
	);
}
