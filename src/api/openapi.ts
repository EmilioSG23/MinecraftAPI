import {
	API_VERSION,
	ENTITY_LABELS,
	ENTITY_TYPES,
	MC_VERSION,
	type EntityType,
} from "@/utils/consts";

/** Describes a path parameter exposed by a documented endpoint. */
export interface ApiEndpointParameter {
	name: string;
	description: string;
	example: string;
}

/** Represents a single GET endpoint that can be explored from the built-in API docs. */
export interface ApiEndpointDefinition {
	id: string;
	entity: EntityType;
	method: "GET";
	path: string;
	summary: string;
	description: string;
	parameters?: ApiEndpointParameter[];
	responseDescription: string;
}

const ENTITY_EXAMPLES: Record<EntityType, { id: string; key: string; value: string }> = {
	advancements: { id: "adventure/root", key: "interface", value: "Adventure" },
	biomes: { id: "plains", key: "name", value: "Plains" },
	blocks: { id: "stone", key: "name", value: "Stone" },
	items: { id: "diamond_sword", key: "name", value: "Diamond Sword" },
	mobs: { id: "creeper", key: "behavior", value: "Hostile" },
	structures: { id: "village", key: "name", value: "Village" },
};

/** Lists all entity types supported by the API and documentation explorer. */
export const DOCUMENTED_ENTITIES = Object.keys(ENTITY_TYPES) as EntityType[];

/**
 * Returns a concrete example URL for a templated endpoint.
 *
 * @param endpoint Endpoint definition with path parameters.
 * @returns Relative API path with example values injected.
 */
export function getExamplePath(endpoint: ApiEndpointDefinition): string {
	const examples = ENTITY_EXAMPLES[endpoint.entity];

	return endpoint.path
		.replace(":entity", endpoint.entity)
		.replace(":id", examples.id)
		.replace(":key", examples.key)
		.replace(":value", examples.value);
}

/**
 * Generates the list of interactive endpoints shown in the documentation UI.
 *
 * @returns Normalized endpoint definitions grouped later by entity.
 */
export function getApiEndpointDefinitions(): ApiEndpointDefinition[] {
	return DOCUMENTED_ENTITIES.flatMap((entity) => {
		const label = ENTITY_LABELS[entity];

		return [
			{
				id: `${entity}-list`,
				entity,
				method: "GET",
				path: `/api/${entity}`,
				summary: `List all ${entity}`,
				description: `Returns every ${label.toLowerCase()} entry enriched with a direct image URL.`,
				responseDescription: `Array of ${label.toLowerCase()} objects including an image field.`,
			},
			{
				id: `${entity}-count`,
				entity,
				method: "GET",
				path: `/api/${entity}/count`,
				summary: `Count ${entity}`,
				description: `Returns the total number of ${label.toLowerCase()} stored in the dataset.`,
				responseDescription: "Numeric count of available entries.",
			},
			{
				id: `${entity}-keys`,
				entity,
				method: "GET",
				path: `/api/${entity}/keys`,
				summary: `List ${entity} keys`,
				description: `Returns the top-level keys available in the ${label.toLowerCase()} payloads.`,
				responseDescription: "Array of property names available for the entity.",
			},
			{
				id: `${entity}-item`,
				entity,
				method: "GET",
				path: `/api/${entity}/:id`,
				summary: `Get one ${entity.slice(0, -1)}`,
				description: `Returns a single ${label.slice(0, -1).toLowerCase()} by its unique id.`,
				parameters: [
					{
						name: "id",
						description: `Unique ${label.slice(0, -1).toLowerCase()} identifier.`,
						example: ENTITY_EXAMPLES[entity].id,
					},
				],
				responseDescription: "Single entity object.",
			},
			{
				id: `${entity}-image`,
				entity,
				method: "GET",
				path: `/api/${entity}/:id/image`,
				summary: `Get ${entity.slice(0, -1)} image`,
				description: `Returns the public sprite or artwork for a specific ${label.slice(0, -1).toLowerCase()}.`,
				parameters: [
					{
						name: "id",
						description: `Unique ${label.slice(0, -1).toLowerCase()} identifier.`,
						example: ENTITY_EXAMPLES[entity].id,
					},
				],
				responseDescription: "Binary image response.",
			},
			{
				id: `${entity}-all-key`,
				entity,
				method: "GET",
				path: `/api/${entity}/all/:key`,
				summary: `Project one ${entity.slice(0, -1)} field`,
				description: `Returns all entries reduced to id plus the requested field when the key exists.`,
				parameters: [
					{
						name: "key",
						description: "Top-level field name to project.",
						example: ENTITY_EXAMPLES[entity].key,
					},
				],
				responseDescription: "Array of reduced objects with id and the requested key.",
			},
			{
				id: `${entity}-all-key-value`,
				entity,
				method: "GET",
				path: `/api/${entity}/all/:key/:value`,
				summary: `Filter ${entity} by field`,
				description: `Filters the dataset by strict string equality on the provided key and value.`,
				parameters: [
					{
						name: "key",
						description: "Top-level field name used for filtering.",
						example: ENTITY_EXAMPLES[entity].key,
					},
					{
						name: "value",
						description: "Expected string representation of the field value.",
						example: ENTITY_EXAMPLES[entity].value,
					},
				],
				responseDescription: "Array of entities matching the requested field value.",
			},
			{
				id: `${entity}-item-key`,
				entity,
				method: "GET",
				path: `/api/${entity}/:id/:key`,
				summary: `Get one ${entity.slice(0, -1)} field`,
				description: `Returns only one field from the selected ${label.slice(0, -1).toLowerCase()} entry.`,
				parameters: [
					{
						name: "id",
						description: `Unique ${label.slice(0, -1).toLowerCase()} identifier.`,
						example: ENTITY_EXAMPLES[entity].id,
					},
					{
						name: "key",
						description: "Top-level field name to extract from the entity.",
						example: ENTITY_EXAMPLES[entity].key,
					},
				],
				responseDescription: "Object containing the id and the requested key.",
			},
		];
	});
}

/**
 * Builds a lightweight OpenAPI document from the real route patterns implemented by the API.
 *
 * @param siteUrl Public origin used as the OpenAPI server URL.
 * @returns OpenAPI 3.1 specification for external tooling or future Swagger integrations.
 */
export function buildOpenApiDocument(siteUrl: string) {
	const paths = getApiEndpointDefinitions().reduce<Record<string, unknown>>(
		(accumulator, endpoint) => {
			const pathKey = endpoint.path.replace(/:([a-z]+)/g, "{$1}");
			const parameters = endpoint.parameters?.map((parameter) => ({
				name: parameter.name,
				in: "path",
				required: true,
				description: parameter.description,
				schema: { type: "string", example: parameter.example },
			}));

			accumulator[pathKey] = {
				get: {
					tags: [ENTITY_LABELS[endpoint.entity]],
					summary: endpoint.summary,
					description: endpoint.description,
					operationId: endpoint.id,
					parameters,
					responses: {
						200: {
							description: endpoint.responseDescription,
						},
						400: {
							description:
								"Bad request caused by an invalid key, parameter count or unsupported input.",
						},
						404: {
							description: "Entity type, entity id or image resource was not found.",
						},
					},
					"x-examplePath": getExamplePath(endpoint),
				},
			};

			return accumulator;
		},
		{
			"/api": {
				get: {
					tags: ["Meta"],
					summary: "API health check",
					description: "Returns a welcome message used to verify that the API is reachable.",
					operationId: "api-root",
					responses: {
						200: {
							description: "Simple JSON response confirming the API is online.",
						},
					},
				},
			},
		},
	);

	return {
		openapi: "3.1.0",
		info: {
			title: "Minecraft API",
			version: API_VERSION,
			description: `Read-only Minecraft data API covering blocks, items, mobs, structures, advancements and biomes up to Minecraft ${MC_VERSION}.`,
		},
		servers: [{ url: siteUrl }],
		paths,
	};
}
