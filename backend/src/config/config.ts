import dotenv from "dotenv";
dotenv.config();

const environment = process.env.NODE_ENV || "dev";
export const PORT = process.env.PORT || 4000;
export const API_URL = environment === "prod" ? process.env.API_URL : `http://localhost:${PORT}`;
