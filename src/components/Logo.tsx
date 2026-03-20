import { MENU_TEXTS } from "@/consts";
import { useEffect, useState } from "react";

export function Logo() {
	const [splash, setSplash] = useState<string>("");
	useEffect(() => {
		setSplash(MENU_TEXTS[Math.floor(Math.random() * MENU_TEXTS.length)]);
	}, []);

	return (
		<div className="relative mx-auto mt-5 mb-10 pointer-events-none">
			<img src="minecraft.webp" alt="Minecraft API Logo" />
			<span
				className="absolute -right-28 bottom-0 text-yellow-300 text-center
      text-[14px] xs:text-[16px] sm:text-[20px] lg:text-[24px] xl:text-[28px]
      w-lg leading-snug whitespace-normal wrap-break-word -rotate-12
      animate-text-menu
    "
			>
				{splash}
			</span>
		</div>
	);
}
