"use client";

/** Client wrapper used by the information index route. */
import { InformationSection } from "@/features/information/components/InformationSection";
import { Layout } from "@/shared/layout/Layout";

/**
 * Renders the information hub inside the shared layout.
 *
 * @returns Information root view wrapped with layout chrome.
 */
export function InformationPageClient() {
	return (
		<Layout childrenWidth="max-w-3xl">
			<InformationSection />
		</Layout>
	);
}

