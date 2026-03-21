/** Shared context hooks used to keep the header navigation synchronized with the active page. */
import { createContext, useContext, useEffect } from "react";

interface HeaderContextType {
	activeSection: string;
	changeActiveSection: (section: string) => void;
}

/** Context containing the currently active header section and the update callback. */
export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

/**
 * Returns the current header section context.
 *
 * @returns Active section name and updater callback.
 */
export function useActiveSection() {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error("useActiveSection must be used within a HeaderProvider");
	}
	return context;
}

/**
 * Marks a section as active when the consuming view is mounted.
 *
 * @param section Section identifier that should be reflected in the header UI.
 */
export function useChangeSection(section: string) {
	const { changeActiveSection } = useActiveSection();
	useEffect(() => {
		changeActiveSection(section);
	}, [changeActiveSection, section]);
}
