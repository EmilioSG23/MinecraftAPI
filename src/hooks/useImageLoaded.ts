import { useCallback, useEffect, useState } from "react";

export function useImageLoaded(length: number) {
	const [imagesLoaded, setImagesLoaded] = useState(0);
	const [isAllImageLoaded, setIsAllImageLoaded] = useState(false);

	const addImageLoaded = useCallback(() => {
		setImagesLoaded((prev) => prev + 1);
	}, []);

	useEffect(() => {
		if (length === 0) {
			setIsAllImageLoaded(true);
			return;
		}

		if (imagesLoaded === length && length > 0) {
			setIsAllImageLoaded(true);
			return;
		}

		// Fallback: if images don't finish loading after 8s, stop blocking UI
		const to = setTimeout(() => {
			setIsAllImageLoaded(true);
		}, 8000);
		return () => clearTimeout(to);
	}, [length, imagesLoaded]);

	return { isAllImageLoaded, addImageLoaded };
}
