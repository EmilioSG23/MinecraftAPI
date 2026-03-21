/** Shared lightweight helpers for querying the internal API routes from the client. */

interface FetchByUrlResult {
	data: any;
	status: number;
}

/**
 * Fetches a specific API URL and returns both payload and status code.
 *
 * @param url Relative API path without the /api prefix.
 * @returns Parsed payload together with the raw HTTP status code.
 */
export async function fetchApiResource(url: string): Promise<FetchByUrlResult> {
	try {
		const response = await fetch(`/api/${url}`);
		const data = await response.json();
		return { data, status: response.status };
	} catch (error) {
		return { data: `Unexpected Error 400 occurred. ${error}.`, status: 400 };
	}
}
