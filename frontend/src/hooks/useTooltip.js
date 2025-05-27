import { useEffect, useState } from "react";

export function useTooltip() {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState(null);
	const [position, setPosition] = useState({ x: -1000, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event) => {
			setPosition({ x: event.clientX + 5, y: event.clientY - 25 });
		};
		if (visible) document.addEventListener("mousemove", handleMouseMove);
		else document.removeEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [visible]);

	return { visible, setVisible, content, setContent, position };
}
