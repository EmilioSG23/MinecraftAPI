/** Home route for the Minecraft API web application. */
import { HomePageClient } from "@/features/home/entry/HomePageClient";
import type { Metadata } from "next";

/** SEO metadata for the landing page. */
export const metadata: Metadata = {
	title: "Home - Minecraft API",
	description:
		"Minecraft API home page with quick access to information, terminal, and documentation.",
};

/**
 * Renders the homepage and injects JSON-LD metadata for search engines.
 *
 * @returns Landing page client view.
 */
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

