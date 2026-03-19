"use client";

import { HeaderContext } from "@/hooks/useSection";
import { useCallback, useState } from "react";

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
