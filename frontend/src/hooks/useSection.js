import { createContext, useContext, useEffect } from "react";

export const HeaderContext = createContext();

export function useActiveSection() {
	return useContext(HeaderContext);
}

export function useChangeSection(section) {
	const { changeActiveSection } = useActiveSection();
	useEffect(() => {
		changeActiveSection(section);
	}, [changeActiveSection, section]);
}
