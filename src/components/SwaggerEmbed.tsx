import { ApiDocsExplorer } from "@/components/ApiDocsExplorer";

/**
 * Legacy compatibility wrapper kept after removing the broken Swagger dependency flow.
 *
 * @returns The first-party API explorer used across documentation pages.
 */
export default function SwaggerEmbed() {
	return (
		<div className="w-full">
			<ApiDocsExplorer
				compact
				title="API Playground"
				description="Execute the same GET routes exposed by the public API without depending on Swagger UI."
			/>
		</div>
	);
}
