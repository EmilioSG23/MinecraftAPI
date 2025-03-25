import express, { Request, Response } from "express";
import generalRoute from "./generalRouter";
import cors from "cors";

import { Advancements, Biomes, Blocks, Items, Mobs, Structures } from "./data/interfaces";
import { advancements, biomes, blocks, items, mobs, structures } from "./validations";
import path from "path";

const app = express();

export const port = process.env.PORT || 4000;

app.use(express.json());

const corsOptions = {
	origin: "*",
	methods: "GET",
	allowedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/api", (req: Request, res: Response) => {
	res.json({ message: "Welcome to Minecraft API" });
});

app.use("/api/advancements", generalRoute<Advancements>(advancements, "Advancement"));
app.use("/api/biomes", generalRoute<Biomes>(biomes, "Biome"));
app.use("/api/blocks", generalRoute<Blocks>(blocks, "Block"));
app.use("/api/items", generalRoute<Items>(items, "Item"));
app.use("/api/mobs", generalRoute<Mobs>(mobs, "Mobs"));
app.use("/api/structures", generalRoute<Structures>(structures, "Structure"));

app.get("/api/*", (req: Request, res: Response) => {
	res.json({ message: "The route you try to access doesn't exists in API." });
});

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
