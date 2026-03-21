/** Terminal route that exposes the interactive command interface. */
import { TerminalPageClient } from "@/features/terminal/entry/TerminalPageClient";
import { Fallback } from "@/shared/components/Fallback";
import type { Metadata } from "next";
import { Suspense } from "react";

/** SEO metadata for the terminal page. */
export const metadata: Metadata = {
	title: "Terminal - Minecraft API",
	description: "Interactive terminal to query the Minecraft API with commands.",
};

/**
 * Renders the terminal route and its structured data metadata.
 *
 * @returns Terminal page client wrapper.
 */
export default function TerminalPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft API Terminal",
		description: "Interactive terminal to query the Minecraft API with commands.",
		url: "/terminal",
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Suspense fallback={<Fallback message="Loading page..." />}>
				<TerminalPageClient />
			</Suspense>
		</>
	);
}
