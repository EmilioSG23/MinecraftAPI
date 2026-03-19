import { createContext, useContext, useEffect } from "react";

interface HeaderContextType {
	activeSection: string;
	changeActiveSection: (section: string) => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useActiveSection() {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error("useActiveSection must be used within a HeaderProvider");
	}
	return context;
}

export function useChangeSection(section: string) {
	const { changeActiveSection } = useActiveSection();
	useEffect(() => {
		console.log(`Active section changed to: ${section}`);
		changeActiveSection(section);
	}, [changeActiveSection, section]);
}
