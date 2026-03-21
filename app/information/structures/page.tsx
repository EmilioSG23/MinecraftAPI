/** Structures information route. */
import { StructuresInformationClient } from "@/features/information/entry/StructuresInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Layout } from "@/shared/layout/Layout";
import type { Metadata } from "next";

/** SEO metadata for the structures page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Structures",
	description: "Browse all Minecraft structures and API endpoints.",
	path: "/information/structures",
	pageName: "Minecraft Structures",
});

/**
 * Renders the structures catalogue page.
 *
 * @returns Layout-wrapped structures client view.
 */
export default function StructuresPage() {
	return (
		<Layout>
			{renderInformationRoute(
				{
					title: "Structures",
					description: "Browse all Minecraft structures and API endpoints.",
					path: "/information/structures",
					pageName: "Minecraft Structures",
				},
				<StructuresInformationClient />,
			)}
		</Layout>
	);
}
