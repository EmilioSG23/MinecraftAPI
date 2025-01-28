import { Router, Request, Response } from "express";
import { Items } from '../data/interfaces';
import generalRouter from "./generalRouter";

const data = require('../data/items.json') as Items[];
const router = generalRouter<Items>(data, "Item");

export default router;