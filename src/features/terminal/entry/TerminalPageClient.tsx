"use client";

/** Client wrapper for the terminal route. */
import { Layout } from "@/shared/layout/Layout";
import { Terminal } from "@/features/terminal/components/Terminal";

/**
 * Keeps the terminal route in a client boundary so it can receive mutable background callbacks.
 *
 * @returns Layout wrapper that injects background configuration callbacks into the terminal.
 */
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

