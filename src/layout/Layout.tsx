"use client";

import { Background } from "@/components/Background";
import { ConfigButton } from "@/components/buttons/ConfigButton";
import { GitHubButton } from "@/components/buttons/GitHubButton";
import { Header } from "@/components/Header";
import { useConfigBackground } from "@/hooks/useConfigBackground";
import { useEffect } from "react";

function SelectionSoundEffect() {
	useEffect(() => {
		const sound = new Audio("/gui/selection.m4a");
		sound.volume = 0.5;
		const handleClick = (event: MouseEvent) => {
			const anchor = (event.target as HTMLElement).closest("a, button");
			if (anchor) {
				sound.play();
				sound.currentTime = 0;
			}
		};
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);
	return null;
}

export interface BackgroundConfig {
	changePanorama: (panorama: number) => void;
	changeBlur: (blur: number) => void;
	changeDisplayMode: (displayMode: string) => void;
}

interface LayoutProps {
	children: React.ReactNode | ((config: BackgroundConfig) => React.ReactNode);
	className?: string;
	childrenWidth?: string;
}

export function Layout({ children, className = "", childrenWidth = "max-w-6xl" }: LayoutProps) {
	const { panorama, blur, displayMode, changePanorama, changeBlur, changeDisplayMode } =
		useConfigBackground();

	const config: BackgroundConfig = { changePanorama, changeBlur, changeDisplayMode };

	return (
		<main className={`overflow-x-hidden font-main ${className}`.trim()}>
			<SelectionSoundEffect />
			<Background panorama={panorama} blur={blur} />
			<Header />
			<main className="w-full flex items-center justify-center my-4! py-4!">
				<div className={`w-full ${childrenWidth}`}>
					{typeof children === "function" ? children(config) : children}
				</div>
			</main>
			<ConfigButton
				panorama={panorama}
				blur={blur}
				setPanorama={changePanorama}
				setBlur={changeBlur}
				display={displayMode}
				setDisplayMode={changeDisplayMode}
			/>
			<GitHubButton />
		</main>
	);
}

/**
 * Returns the config callbacks needed by Terminal page.
 * Usage: const { ref, ...config } = useLayoutConfig();
 */
export function useLayoutConfig() {
	return useConfigBackground();
}
