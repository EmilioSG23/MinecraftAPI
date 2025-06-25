import swaggerUi from "swagger-ui-express";

interface EntitySpec {
	name: string; // Ej: 'Mobs'
	path: string; // Ej: 'mobs'
}

const entities: EntitySpec[] = [
	{ name: "Advancements", path: "advancements" },
	{ name: "Biomes", path: "biomes" },
	{ name: "Blocks", path: "blocks" },
	{ name: "Items", path: "items" },
	{ name: "Mobs", path: "mobs" },
	{ name: "Structures", path: "structures" },
];

const generatePaths = () => {
	const paths: Record<string, any> = {};

	for (const { name, path } of entities) {
		const tag = name;

		paths[`/api/${path}`] = {
			get: {
				tags: [tag],
				summary: `Get all ${name}`,
				description: `Returns a list of all ${name}`,
				responses: {
					200: {
						description: `List of ${name}`,
					},
				},
			},
		};

		paths[`/api/${path}/count`] = {
			get: {
				tags: [tag],
				summary: `Get count of ${name}`,
				description: `Returns number of ${name}`,
				responses: {
					200: {
						description: `Count of ${name}`,
					},
				},
			},
		};

		paths[`/api/${path}/{id}`] = {
			get: {
				tags: [tag],
				summary: `Get a ${name} by ID`,
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "string" },
					},
				],
				responses: {
					200: { description: `${name} found` },
					404: { description: `${name} not found` },
				},
			},
		};

		paths[`/api/${path}/{id}/image`] = {
			get: {
				tags: [tag],
				summary: `Get image for ${name}`,
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "string" },
					},
				],
				responses: {
					200: { description: "Image file" },
					404: { description: "Image not found" },
				},
			},
		};

		paths[`/api/${path}/all/{key}`] = {
			get: {
				tags: [tag],
				summary: `Get all ${name} with specific key`,
				parameters: [
					{
						in: "path",
						name: "key",
						required: true,
						schema: { type: "string" },
					},
				],
				responses: {
					200: { description: "List with key" },
					400: { description: "Key not exists" },
				},
			},
		};

		paths[`/api/${path}/all/{key}/{value}`] = {
			get: {
				tags: [tag],
				summary: `Filter ${name} by key and value`,
				parameters: [
					{ in: "path", name: "key", required: true, schema: { type: "string" } },
					{ in: "path", name: "value", required: true, schema: { type: "string" } },
				],
				responses: {
					200: { description: "Filtered list" },
					400: { description: "Key not exists" },
				},
			},
		};

		paths[`/api/${path}/{id}/{key}`] = {
			get: {
				tags: [tag],
				summary: `Get a specific key of ${name}`,
				parameters: [
					{ in: "path", name: "id", required: true, schema: { type: "string" } },
					{ in: "path", name: "key", required: true, schema: { type: "string" } },
				],
				responses: {
					200: { description: "Value of key" },
					400: { description: "Key not exists" },
					404: { description: `${name} not found` },
				},
			},
		};
	}

	return paths;
};

const swaggerSpec = {
	openapi: "3.0.0",
	info: {
		title: "Minecraft API",
		version: "1.0.0",
		description: "Minecraft API Documentation generated with Swagger.",
	},
	paths: generatePaths(),
	tags: entities.map(({ name }) => ({ name })),
};

export { swaggerSpec, swaggerUi };
