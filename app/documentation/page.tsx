/** Long-form project documentation route. */
import { DocumentationPageClient } from "@/pages/DocumentationPageClient";
import type { Metadata } from "next";

/** SEO metadata for the documentation overview route. */
export const metadata: Metadata = {
	title: "Documentation - Minecraft API",
	description: "Interactive API documentation and endpoint references.",
};

/**
 * Renders the documentation overview page with JSON-LD metadata.
 *
 * @returns Project documentation client view.
 */
export default function DocumentationPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft API Documentation",
		description: "Interactive API documentation and endpoint references.",
		url: "/documentation",
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<DocumentationPageClient />
		</>
	);
}
