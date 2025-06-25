import express from "express";
import type { Request, Response } from "express";
import generalRoute from "./generalRouter";
import cors from "cors";

import type { Advancements, Biomes, Blocks, Items, Mobs, Structures } from "./data/interfaces";
import { advancements, biomes, blocks, items, mobs, structures } from "./validations";
import path from "node:path";
import { swaggerSpec, swaggerUi } from "./config/swagger";
import { PORT } from "./config/config";

const app = express();
app.use(express.json());

const corsOptions = {
	origin: "*",
	methods: "GET",
	allowedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs-json", (_req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(swaggerSpec);
});

app.get("/api", (req: Request, res: Response) => {
	res.status(200).json({ message: "Welcome to Minecraft API" });
});

app.use("/api/advancements", generalRoute<Advancements>(advancements, "Advancement"));
app.use("/api/biomes", generalRoute<Biomes>(biomes, "Biome"));
app.use("/api/blocks", generalRoute<Blocks>(blocks, "Block"));
app.use("/api/items", generalRoute<Items>(items, "Item"));
app.use("/api/mobs", generalRoute<Mobs>(mobs, "Mobs"));
app.use("/api/structures", generalRoute<Structures>(structures, "Structure"));

app.get("/api/*", (req: Request, res: Response) => {
	res.status(400).json({ message: "The route you try to access doesn't exists in API." });
});

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening in port: ${PORT}`);
});
