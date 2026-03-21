/** Tooltip state hook shared by hoverable information cards. */
import { useEffect, useState } from "react";

interface Position {
	x: number;
	y: number;
}

/**
 * Manages tooltip content, visibility, and cursor-following position.
 *
 * @returns Tooltip state and setters consumed by card components.
 */
export function useTooltip() {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [position, setPosition] = useState<Position>({ x: -1000, y: 0 });

	useEffect(() => {
		if (!visible) return;

		let frameId = 0;
		const handleMouseMove = (event: MouseEvent) => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(() => {
				setPosition({ x: event.clientX + 5, y: event.clientY - 25 });
			});
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			cancelAnimationFrame(frameId);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [visible]);

	return { visible, setVisible, content, setContent, position, setPosition };
}
