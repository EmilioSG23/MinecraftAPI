import Router from "express";
import type { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";
import { API_URL } from "./config/config";

const generalRouter = <T extends { id: string }>(datas: T[], message: string) => {
	const IMAGE_EXTENSIONS = ["png", "webp", "gif"];
	const router = Router();

	//Main Page
	router.get("/", (req: Request, res: Response) => {
		const dataWithImage = datas.map((data) => {
			return { ...data, image: `${API_URL}${req.baseUrl}/${data.id}/image` };
		});
		res.status(200).json(dataWithImage);
	});

	router.get("/count", (req: Request, res: Response) => {
		res.status(200).json(datas.length);
	});
	router.get("/keys", (req: Request, res: Response) => {
		//TEMPORAL
		res.status(200).json(Object.keys(datas[0]));
	});

	//Data ID
	router.get("/:id/", (req: Request, res: Response) => {
		const id = req.params.id;
		const data: T | undefined = datas.find((data) => data.id === id);
		if (!data) {
			res.status(404).json({
				message: `${message} with id ${req.params.id} not found.`,
			});
			return;
		}
		res.status(200).json(data);
	});

	//Image of Data
	router.get("/:id/image", (req: Request, res: Response) => {
		const id = req.params.id;
		const data: T | undefined = datas.find((data: { id: string }) => data.id === id);
		const type: string = req.originalUrl.split("/")[2];
		if (!data) {
			res.status(404).json({
				message: `${message} with id ${req.params.id} not found.`,
			});
			return;
		}
		const basePath = path.join(__dirname, "/images", type, data.id);
		const imagePath = IMAGE_EXTENSIONS.map((ext) => `${basePath}.${ext}`).find((file) =>
			fs.existsSync(file)
		);

		if (imagePath) {
			return res.status(200).sendFile(imagePath);
		}

		res.status(404).json({ message: `Image for ${id} not found.` });
	});

	//Show all datas only with a key
	router.get("/all/:key", (req: Request, res: Response) => {
		const key = req.params.key;
		const datasByKey = datas
			.map((data: T & Record<string, unknown>) => ({
				id: data.id,
				[key]: data[key],
			}))
			.filter((value) => value[key] !== undefined);

		if (datasByKey.length > 0) res.status(200).json(datasByKey);
		else res.status(400).json({ message: `Key ${key} not exists.` });
	});

	//Filter datas by a key and value
	router.get("/all/:key/:value", (req: Request, res: Response) => {
		const key = req.params.key;
		const valueReq = req.params.value;
		const datasByKey = datas.filter(
			(value: T & Record<string, unknown>) => value[key] !== undefined && value[key] === valueReq
		);

		if (datasByKey.length > 0) res.status(200).json(datasByKey);
		else res.status(400).json({ message: `Key ${key} not exists.` });
	});

	//Show the key of an data
	router.get("/:id/:key", (req: Request, res: Response) => {
		const id = req.params.id;
		const key = req.params.key;
		const data: (T & Record<string, unknown>) | undefined = datas.find(
			(data: { id: string }) => data.id === id
		);
		if (!data) {
			res.status(404).json({
				message: `${message} with id ${req.params.id} not found.`,
			});
			return;
		}
		if (key && Object.prototype.hasOwnProperty.call(data, key))
			res.status(200).json({ id: id, [key]: data[key] });
		else res.status(400).json({ message: `Key ${key} not exists in ${id}.` });
	});

	return router;
};

export default generalRouter;
