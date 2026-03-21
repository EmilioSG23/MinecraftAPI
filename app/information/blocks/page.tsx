/** Blocks information route. */
import { BlocksInformationClient } from "@/features/information/entry/BlocksInformationClient";
import {
	createInformationMetadata,
	renderInformationRoute,
} from "@/features/information/lib/route";
import { Layout } from "@/shared/layout/Layout";
import type { Metadata } from "next";

/** SEO metadata for the blocks page. */
export const metadata: Metadata = createInformationMetadata({
	title: "Blocks",
	description: "Browse all Minecraft blocks with properties and API endpoints.",
	path: "/information/blocks",
	pageName: "Minecraft Blocks",
});

/**
 * Renders the blocks catalogue page.
 *
 * @returns Layout-wrapped blocks client view.
 */
export default function BlocksPage() {
	return (
		<Layout>
			{renderInformationRoute(
				{
					title: "Blocks",
					description: "Browse all Minecraft blocks with properties and API endpoints.",
					path: "/information/blocks",
					pageName: "Minecraft Blocks",
				},
				<BlocksInformationClient />,
			)}
		</Layout>
	);
}
