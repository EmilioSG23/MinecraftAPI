import { useEffect, useState } from "react";

export const DISPLAY_MODE = {
	RANDOM: "random",
	SELECT: "select",
};

const DEFAULT = {
	panorama: 10,
	blur: 5,
	displayMode: DISPLAY_MODE.SELECT,
};

const VALUES = {
	PANORAMA: "panorama",
	DISPLAY_MODE: "displayMode",
	BLUR: "blur",
};

function getStorageItem(key: string, fallback: string): string {
	if (typeof window === "undefined") return fallback;
	return window.localStorage.getItem(key) ?? fallback;
}

export function useConfigBackground() {
	const [panorama, setPanorama] = useState(() =>
		Number(getStorageItem(VALUES.PANORAMA, String(DEFAULT.panorama))),
	);
	const [displayMode, setDisplayMode] = useState(() =>
		getStorageItem(VALUES.DISPLAY_MODE, DEFAULT.displayMode),
	);
	const [blur, setBlur] = useState(() => Number(getStorageItem(VALUES.BLUR, String(DEFAULT.blur))));

	const changePanorama = (panorama: number) => {
		setPanorama(panorama);
		if (displayMode === DISPLAY_MODE.SELECT)
			window.localStorage.setItem(VALUES.PANORAMA, panorama.toString());
	};
	const changeDisplayMode = (newMode: string) => {
		setDisplayMode(newMode);
		window.localStorage.setItem(VALUES.DISPLAY_MODE, newMode);
		if (newMode === DISPLAY_MODE.SELECT) {
			const saved = Number(getStorageItem(VALUES.PANORAMA, String(DEFAULT.panorama)));
			setPanorama(saved);
		}
	};
	const changeBlur = (blur: number) => {
		setBlur(blur);
		window.localStorage.setItem(VALUES.BLUR, blur.toString());
	};

	useEffect(() => {
		if (displayMode === DISPLAY_MODE.RANDOM) {
			const rng = Math.floor(Math.random() * 10) + 1;
			setPanorama(rng);
		}
	}, [displayMode]);

	return {
		panorama,
		blur,
		displayMode,
		changePanorama,
		changeBlur,
		changeDisplayMode,
	};
}
