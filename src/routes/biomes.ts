import { Router, Request, Response } from "express";
import {default as data} from '../data/biomes.json';
import {Biomes} from '../data/interfaces';
import generalRouter from "./generalRouter";

const router = generalRouter<Biomes>(data, "Biome");

export default router;