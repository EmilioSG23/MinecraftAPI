"use client";

import { Layout } from "@/layout/Layout";
import { Menu } from "@/views/Menu";

/** Client wrapper for home page layout and interactions. */
export function HomePageClient() {
	return (
		<Layout className="font-main">
			<Menu />
		</Layout>
	);
}
