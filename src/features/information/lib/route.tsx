import type { Metadata } from "next";
import type { ReactNode } from "react";

interface InformationRouteDefinition {
	title: string;
	description: string;
	path: string;
	pageName: string;
}

/** Builds the metadata object shared by information entity routes. */
export function createInformationMetadata(definition: InformationRouteDefinition): Metadata {
	return {
		title: `${definition.title} - Minecraft API`,
		description: definition.description,
	};
}

/** Renders the JSON-LD payload and feature client for an information entity page. */
export function renderInformationRoute(definition: InformationRouteDefinition, content: ReactNode) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: definition.pageName,
		description: definition.description,
		url: definition.path,
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			{content}
		</>
	);
}
