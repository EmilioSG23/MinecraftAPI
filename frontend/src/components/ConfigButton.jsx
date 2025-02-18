import { useEffect, useState } from "react";
import { DISPLAY_MODE } from "../hooks/useConfigBackground";

const handleDisplay = (event, setDisplayOption) => {
	const configuration = document.getElementById("configuration");
	if (configuration && !configuration.contains(event.target)) {
		setDisplayOption(false);
	}
};

export function ConfigButton({ panorama, blur, display, setPanorama, setBlur, setDisplayMode }) {
	const [displayOption, setDisplayOption] = useState(false);

	useEffect(() => {
		let timeout;
		const handleClickOutside = (event) => handleDisplay(event, setDisplayOption);
		if (displayOption) {
			timeout = setTimeout(() => {
				document.addEventListener("click", handleClickOutside);
			}, 0);
		}
		return () => {
			clearTimeout(timeout);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [displayOption]);

	return (
		<>
			<button
				className="fixed bg-[#a0a0a0] border-3 border-black hover:border-white bottom-5 left-5 cursor-pointer"
				onClick={() => {
					setDisplayOption(!displayOption);
				}}
			>
				<img src="/gui/config.png" className="p-2 w-[48x] h-[48px]" />
			</button>
			<div
				id="configuration"
				className={`${displayOption ? "fixed" : "hidden"} bg-[#a0a0a0] bottom-19 left-5 p-2 text-center border-3 border-black`}
			>
				<h1 className="font-bold">Configuration</h1>
				<section className="mb-2">
					<h2 className="underline">Initial Display Mode</h2>
					<div className="flex justify-center w-full px-1 gap-x-1">
						<button
							className={`w-1/2 ${display === DISPLAY_MODE.RANDOM ? "bg-[#8f8f8f]" : "bg-[#5f5f5f]"} hover:outline-2 hover:outline-white cursor-pointer`}
							onClick={() => {
								if (display !== DISPLAY_MODE.RANDOM) setDisplayMode(DISPLAY_MODE.RANDOM);
							}}
						>
							Random
						</button>
						<button
							className={`w-1/2 ${display === DISPLAY_MODE.SELECT ? "bg-[#8f8f8f]" : "bg-[#5f5f5f]"} hover:outline-2 hover:outline-white cursor-pointer`}
							onClick={() => {
								if (display !== DISPLAY_MODE.SELECT) setDisplayMode(DISPLAY_MODE.SELECT);
							}}
						>
							Selector
						</button>
					</div>
				</section>
				<section className={`mb-2 ${display === DISPLAY_MODE.SELECT ? "opacity-100" : "opacity-50"}`}>
					<h2 className="underline">Select Panorama</h2>
					<div className="flex justify-center">
						<button
							className={`flex-1 bg-black/25 ${display === DISPLAY_MODE.SELECT ? "cursor-pointer hover:outline-2 hover:outline-white" : ""}`}
							disabled={display === DISPLAY_MODE.RANDOM}
							onClick={() => {
								if (panorama > 1) {
									const result = panorama - 1;
									setPanorama(result);
								} else setPanorama(10);
							}}
						>
							{"<"}
						</button>
						<p className="text-center flex-2">{panorama}</p>
						<button
							className={`flex-1 bg-black/25 ${display === DISPLAY_MODE.SELECT ? "cursor-pointer hover:outline-2 hover:outline-white" : ""}`}
							disabled={display === DISPLAY_MODE.RANDOM}
							onClick={() => {
								if (panorama < 10) {
									const result = panorama + 1;
									setPanorama(result);
								} else setPanorama(1);
							}}
						>
							{">"}
						</button>
					</div>
				</section>
				<section className="items-center justify-center">
					<h2 className="underline">Config Blur</h2>
					<small className="italic text-[60%] text-gray-700">(not display in Menu)</small>
					<div className="flex w-full">
						<input
							className="mx-auto w-[200%]"
							type="range"
							min="0"
							max="10"
							value={blur}
							onChange={(e) => {
								setBlur(e.target.value);
							}}
						/>
						<p className="w-full text-center text-black">{blur}</p>
					</div>
				</section>
			</div>
		</>
	);
}
