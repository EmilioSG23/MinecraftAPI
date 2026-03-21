"use client";

import { Layout } from "@/layout/Layout";
import { ApiDocsExplorer } from "@/views/docs/ApiDocsExplorer";

/**
 * Client entrypoint for the dedicated API documentation route.
 *
 * @returns Documentation page rendered inside the shared application layout.
 */
export function ApiDocsPageClient() {
	return (
		<Layout childrenWidth="w-full max-w-6xl">
			<ApiDocsExplorer
				title="Minecraft API Docs"
				description="Reference every GET endpoint, inspect parameter templates and execute live requests without leaving the app."
			/>
		</Layout>
	);
}
