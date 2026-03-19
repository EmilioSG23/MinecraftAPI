import { HeaderProvider } from "@/contexts/HeaderProvider";
import "@/styles/App.css";
import "@/styles/globals.css";
import "@/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minecraft API",
	description:
		"Minecraft API with information of blocks, mobs, items, structures, advancements and biomes.",
	icons: {
		icon: "/flint_and_steel.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<HeaderProvider>{children}</HeaderProvider>
			</body>
		</html>
	);
}
