import { createContext, useContext, useEffect } from "react";

interface HeaderContextType {
	activeSection: string;
	changeActiveSection: (section: string) => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

/** Returns active header section context. */
export function useActiveSection() {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error("useActiveSection must be used within a HeaderProvider");
	}
	return context;
}

/** Updates the active section when current view mounts. */
export function useChangeSection(section: string) {
	const { changeActiveSection } = useActiveSection();
	useEffect(() => {
		changeActiveSection(section);
	}, [changeActiveSection, section]);
}
