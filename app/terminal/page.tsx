"use client";

import { Layout } from "@/layout/Layout";
import { Terminal } from "@/views/Terminal";

export default function TerminalPage() {
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
