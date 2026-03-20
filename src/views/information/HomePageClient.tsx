"use client";

/** Client wrapper used by the home route. */
import { Layout } from "@/layout/Layout";
import { Menu } from "@/views/Menu";

/**
 * Renders the home page inside the shared layout.
 *
 * @returns Home menu wrapped with the shared background and controls.
 */
export function HomePageClient() {
	return (
		<Layout className="font-main">
			<Menu />
		</Layout>
	);
}
