import type { ReactNode } from "react";

/** Shared tooltip contract used by information cards. */
export interface TooltipState {
	setContent: (content: ReactNode) => void;
	setVisible: (visible: boolean) => void;
	setPosition: (position: { x: number; y: number }) => void;
	content: ReactNode;
	visible: boolean;
}
