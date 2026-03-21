/** Mobs information route. */
import { MobsInformationClient } from "@/features/information/entry/MobsInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Layout } from "@/shared/layout/Layout";
import type { Metadata } from "next";

/** SEO metadata for the mobs page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Mobs",
	description: "Browse all Minecraft mobs with behavior and API endpoints.",
	path: "/information/mobs",
	pageName: "Minecraft Mobs",
});

/**
 * Renders the mobs catalogue page.
 *
 * @returns Layout-wrapped mobs client view.
 */
export default function MobsPage() {
	return (
		<Layout>
			{renderInformationRoute(
				{
					title: "Mobs",
					description: "Browse all Minecraft mobs with behavior and API endpoints.",
					path: "/information/mobs",
					pageName: "Minecraft Mobs",
				},
				<MobsInformationClient />,
			)}
		</Layout>
	);
}
