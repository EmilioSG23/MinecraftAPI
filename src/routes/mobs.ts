import { Router, Request, Response } from "express";
import { Mobs } from '../data/interfaces';
import generalRouter from "./generalRouter";

const data = require('../data/mobs.json') as Mobs[];
const router = generalRouter<Mobs>(data, "Mob");

export default router;