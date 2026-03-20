"use client";

import { Layout } from "@/layout/Layout";
import { Information } from "@/views/Information";

/** Client wrapper for information root page. */
export function InformationPageClient() {
	return (
		<Layout childrenWidth="max-w-3xl">
			<Information />
		</Layout>
	);
}
