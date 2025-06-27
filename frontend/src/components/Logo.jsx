import { useEffect, useState } from "react";
import { MENU_TEXTS } from "../consts";

export function Logo() {
	const [splash, setSplash] = useState();
	useEffect(() => {
		setSplash(MENU_TEXTS[Math.floor(Math.random() * MENU_TEXTS.length)]);
	}, []);

	return (
		<div className="relative mx-auto w-[95%] sm:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mt-5 mb-10 pointer-events-none">
			<img src="minecraft.webp" alt="Minecraft API Logo" />
			<span
				className="absolute -right-28 bottom-0 text-yellow-300 text-center
      text-[14px] xs:text-[16px] sm:text-[20px] lg:text-[24px] xl:text-[28px]
      w-[512px] leading-snug whitespace-normal break-words -rotate-12
      animate-text-menu
    "
			>
				{splash}
			</span>
		</div>
	);
}
