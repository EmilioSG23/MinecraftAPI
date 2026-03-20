import { DocumentationPageClient } from "@/views/information/DocumentationPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Documentation - Minecraft API",
	description: "Interactive API documentation and endpoint references.",
};

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
