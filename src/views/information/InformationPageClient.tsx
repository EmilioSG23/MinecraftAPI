"use client";

/** Client wrapper used by the information index route. */
import { Layout } from "@/layout/Layout";
import { Information } from "@/views/Information";

/**
 * Renders the information hub inside the shared layout.
 *
 * @returns Information root view wrapped with layout chrome.
 */
export function InformationPageClient() {
	return (
		<Layout childrenWidth="max-w-3xl">
			<Information />
		</Layout>
	);
}
