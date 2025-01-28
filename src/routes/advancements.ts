import { Router, Request, Response } from "express";
import { Advancements } from '../data/interfaces';
import generalRouter from "./generalRouter";

const data = require('../data/advancements.json') as Advancements[];
const router = generalRouter<Advancements>(data, "Advancement");

export default router;