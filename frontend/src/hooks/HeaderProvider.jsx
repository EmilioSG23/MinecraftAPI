import { useCallback, useState } from "react";
import { HeaderContext } from "./useSection";

export function HeaderProvider({ children }) {
	const [activeSection, setActiveSection] = useState("home");

	const changeActiveSection = useCallback((section) => {
		setActiveSection(section);
	}, []);

	return <HeaderContext.Provider value={{ activeSection, changeActiveSection }}>{children}</HeaderContext.Provider>;
}
