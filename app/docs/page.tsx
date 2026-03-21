import { ApiDocsPageClient } from "@/features/documentation/entry/ApiDocsPageClient";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** Metadata for the dedicated API documentation route. */
export const metadata: Metadata = {
	title: "API Docs - Minecraft API",
	description: "Interactive endpoint explorer and OpenAPI contract for the Minecraft API.",
};

/**
 * Renders the dedicated /docs route for the API documentation experience.
 *
 * @returns SEO metadata plus the in-app endpoint explorer.
 */
export default function DocumentationPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft API Documentation",
		description: "Interactive endpoint explorer and machine-readable OpenAPI contract.",
		url: "/docs",
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Suspense fallback={<Fallback message="Loading page..." />}>
				<ApiDocsPageClient />
			</Suspense>
		</>
	);
}
