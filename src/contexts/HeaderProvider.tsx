"use client";

/** Context provider that stores the active navigation section. */
import { HeaderContext } from "@/hooks/useSection";
import { useCallback, useState } from "react";

/**
 * Provides the active header section to the entire app tree.
 *
 * @param props.children Descendant nodes that consume the header context.
 * @returns Header context provider.
 */
export function HeaderProvider({ children }: { children: React.ReactNode }) {
	const [activeSection, setActiveSection] = useState("home");

	const changeActiveSection = useCallback((section: string) => {
		setActiveSection(section);
	}, []);

	return (
		<HeaderContext.Provider value={{ activeSection, changeActiveSection }}>
			{children}
		</HeaderContext.Provider>
	);
}
