import {Request, Response } from 'express';
import generalRoute from './generalRouter';

import {Advancements, Biomes, Blocks, Items, Mobs, Structures } from './data/interfaces'

//In case of GET custom, discomment this
/*import advancements from './routes/advancements';
import items from './routes/items';
import blocks from './routes/blocks';
import biomes from './routes/biomes';
import mobs from './routes/mobs';
import structures from './routes/structures';*/

import {default as advancements} from './data/advancements.json';
import {default as biomes} from './data/biomes.json';
import {default as blocks} from './data/blocks.json';
import {default as items} from './data/items.json';
import {default as mobs} from './data/mobs.json';
import {default as structures} from './data/structures.json';

const express = require('express')
const app = express();

const port = process.env.PORT || 3000;

app.use (express.json());

//CONSUMOS
app.get('/', (req: Request, res: Response) => {
    res.json({"message": "Welcome to Minecraft API"}); });

//In case of GET custom, discomment this
/*app.use("/api/advancements", advancements);
app.use("/api/items", items);
app.use("/api/blocks", blocks);
app.use("/api/biomes", biomes);
app.use("/api/mobs", mobs);
app.use("/api/structures", structures);*/

app.use("/api/advancements", generalRoute<Advancements>(advancements, "Advancement"));
app.use("/api/biomes", generalRoute<Biomes>(biomes, "Biome"));
app.use("/api/blocks", generalRoute<Blocks>(blocks, "Block"));
app.use("/api/items", generalRoute<Items>(items, "Item"));
app.use("/api/mobs", generalRoute<Mobs>(mobs, "Mobs"));
app.use("/api/structures", generalRoute<Structures>(structures, "Structure"));

app.listen(port, () =>{
    console.log(`Server listening in port: ${port}`);
});