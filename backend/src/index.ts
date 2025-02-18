import express, { Request, Response } from "express";
import generalRoute from "./generalRouter";

import { Advancements, Biomes, Blocks, Items, Mobs, Structures } from "./data/interfaces";
import { advancements, biomes, blocks, items, mobs, structures } from "./validations";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Welcome to Minecraft API" });
});
app.get("/api", (req: Request, res: Response) => {
	res.json({ message: "Welcome to Minecraft API" });
});

app.use("/api/advancements", generalRoute<Advancements>(advancements, "Advancement"));
app.use("/api/biomes", generalRoute<Biomes>(biomes, "Biome"));
app.use("/api/blocks", generalRoute<Blocks>(blocks, "Block"));
app.use("/api/items", generalRoute<Items>(items, "Item"));
app.use("/api/mobs", generalRoute<Mobs>(mobs, "Mobs"));
app.use("/api/structures", generalRoute<Structures>(structures, "Structure"));

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
