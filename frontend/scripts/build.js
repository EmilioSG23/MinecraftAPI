import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, "..", "dist");
const destination = join(__dirname, "..", "..", "backend", "public");

function copyRecursive(src, dest) {
	if (!existsSync(dest)) mkdirSync(dest, { recursive: true });

	const entries = readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = join(src, entry.name);
		const destPath = join(dest, entry.name);

		if (entry.isDirectory()) {
			copyRecursive(srcPath, destPath);
		} else {
			copyFileSync(srcPath, destPath);
		}
	}
}

if (existsSync(destination)) {
	rmSync(destination, { recursive: true, force: true });
}

copyRecursive(source, destination);
rmSync(source, { recursive: true, force: true });
