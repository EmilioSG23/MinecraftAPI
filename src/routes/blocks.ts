import { Router, Request, Response } from "express";
import { Blocks } from '../data/interfaces';
import generalRouter from "./generalRouter";

const data = require('../data/blocks.json') as Blocks[];
const router = generalRouter<Blocks>(data, "Block");

export default router;