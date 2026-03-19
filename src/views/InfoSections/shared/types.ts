import type { ReactNode } from "react";

export interface TooltipType {
	setContent: (content: ReactNode) => void;
	setVisible: (visible: boolean) => void;
	setPosition: (position: { x: number; y: number }) => void;
	content: ReactNode;
	visible: boolean;
}
