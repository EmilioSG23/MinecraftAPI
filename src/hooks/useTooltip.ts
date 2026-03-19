import { useEffect, useState } from "react";

interface Position {
	x: number;
	y: number;
}

export function useTooltip() {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [position, setPosition] = useState<Position>({ x: -1000, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setPosition({ x: event.clientX + 5, y: event.clientY - 25 });
		};
		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [visible]);

	return { visible, setVisible, content, setContent, position, setPosition };
}
