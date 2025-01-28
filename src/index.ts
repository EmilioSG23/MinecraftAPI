import {Request, Response } from 'express';
import advancements from './routes/advancements';
import items from './routes/items';
import blocks from './routes/blocks';
import biomes from './routes/biomes';
import mobs from './routes/mobs';
import structures from './routes/structures';

const express = require('express')
const app = express();

const port = process.env.PORT || 3000;

app.use (express.json());

//CONSUMOS
app.get('/', (req: Request, res: Response) => {
    res.json({"message": "Welcome to Minecraft API"});
 });

app.use("/api/advancements", advancements);
app.use("/api/items", items);
app.use("/api/blocks", blocks);
app.use("/api/biomes", biomes);
app.use("/api/mobs", mobs);
app.use("/api/structures", structures);

app.listen(port, () =>{
    console.log(`Server listening in port: ${port}`);
});