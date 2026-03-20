"use client";

import { Layout } from "@/layout/Layout";
import { Terminal } from "@/views/Terminal";

/** Client wrapper to keep terminal config callbacks in client boundary. */
export function TerminalPageClient() {
	return (
		<Layout childrenWidth="w-full max-w-6xl">
			{({ changePanorama, changeBlur, changeDisplayMode }) => (
				<Terminal
					setPanorama={changePanorama}
					setBlur={changeBlur}
					setDisplayMode={changeDisplayMode}
				/>
			)}
		</Layout>
	);
}
