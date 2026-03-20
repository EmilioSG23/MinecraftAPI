"use client";

import { Layout } from "@/layout/Layout";
import { Documentation } from "@/views/Documentation";

/** Client wrapper for documentation page layout. */
export function DocumentationPageClient() {
	return (
		<Layout>
			<Documentation />
		</Layout>
	);
}
