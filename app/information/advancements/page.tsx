/** Advancements information route. */
import { AdvancementsInformationClient } from "@/features/information/entry/AdvancementsInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Layout } from "@/shared/layout/Layout";
import type { Metadata } from "next";

/** SEO metadata for the advancements page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Advancements",
	description: "Browse all Minecraft advancements and API endpoints.",
	path: "/information/advancements",
	pageName: "Minecraft Advancements",
});

/**
 * Renders the advancements catalogue page.
 *
 * @returns Layout-wrapped advancements client view.
 */
export default function AdvancementsPage() {
	return (
		<Layout>
			{renderInformationRoute(
				{
					title: "Advancements",
					description: "Browse all Minecraft advancements and API endpoints.",
					path: "/information/advancements",
					pageName: "Minecraft Advancements",
				},
				<AdvancementsInformationClient />,
			)}
		</Layout>
	);
}
