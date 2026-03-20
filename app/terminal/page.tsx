import { TerminalPageClient } from "@/views/information/TerminalPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terminal - Minecraft API",
	description: "Interactive terminal to query the Minecraft API with commands.",
};

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
			<TerminalPageClient />
		</>
	);
}
