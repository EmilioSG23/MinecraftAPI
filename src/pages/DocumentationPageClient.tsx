"use client";

/** Client wrapper for the long-form documentation route. */
import { Layout } from "@/layout/Layout";
import { Documentation } from "@/views/Documentation";

/**
 * Renders the documentation overview inside the shared layout.
 *
 * @returns Documentation view wrapped with layout chrome.
 */
export function DocumentationPageClient() {
	return (
		<Layout>
			<Documentation />
		</Layout>
	);
}
