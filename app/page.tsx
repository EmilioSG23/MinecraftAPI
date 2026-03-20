import { HomePageClient } from "@/views/information/HomePageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home - Minecraft API",
	description:
		"Minecraft API home page with quick access to information, terminal, and documentation.",
};

export default function Home() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Minecraft API Home",
		description:
			"Minecraft API home page with quick access to information, terminal, and documentation.",
		url: "/",
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<HomePageClient />
		</>
	);
}
