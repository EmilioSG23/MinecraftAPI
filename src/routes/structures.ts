import { Router, Request, Response } from "express";
import {default as data} from '../data/structures.json';
import {Structures} from '../data/interfaces';
import generalRouter from "./generalRouter";

const router = generalRouter<Structures>(data, "Structure");

export default router;