import { useState } from "react";
import { useChangeSection } from "../hooks/useSection";
import { Link } from "react-router-dom";

export function ErrorPage() {
	useChangeSection("error");

	const sound = new Audio("/creeper_explosion.mp3");
	sound.volume = 0.25;
	sound.currentTime = 1;

	const [enableAnimation, setEnableAnimation] = useState(false);
	const [finishAnimation, setFinishAnimation] = useState(false);

	const animate = () => {
		setEnableAnimation(true);
		sound.play();
		setTimeout(() => setFinishAnimation(true), 1500);
	};

	return (
		<div className={`${!finishAnimation ? "cursor-[url(flint_and_steel.png),_auto]" : ""}`}>
			{!finishAnimation && (
				<>
					<div className="fixed -z-10 bg-red-500/0 h-full w-full" />
					<div
						className="fixed left-1/2 top-[20%] -translate-1/2 bg-black/25
				border-4 text-white/100 text-center w-[90%] sm:w-3/4 xl:w-1/2 py-4 px-8 lg:py-8 lg:px-16 text-[24px] lg:text-[32px] border-white"
					>
						<p>Click to the Crepper...</p>
						<p>Something cool might happen...</p>
					</div>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<img
						src="creeper_error.webp"
						className={`fixed z-10 left-1/2 top-1/2 -translate-1/2 h-80 ${enableAnimation ? "animate-creeper" : ""}`}
						alt="Creeper in a error page"
						onClick={() => animate()}
					/>
				</>
			)}
			{finishAnimation && (
				<>
					<div className="fixed -z-10 bg-red-500/15 h-full w-full" />
					<div className="flex flex-col text-white w-full h-[82vh] justify-center items-center p-10 gap-y-10 text-center">
						<h1 className="text-5xl sm:text-7xl">You Died!</h1>
						<h2 className="text-xl sm:text-3xl">Steve was blown up by Creeper</h2>
						<span className="text-xl sm:text-3xl">
							Score: <span className="text-yellow-400">404</span>
						</span>
						<div className="h-[15vh]" />
						<Link
							to="/"
							className="mc-selector text-[20px] sm:text-[30px] lg:text-[40px] bg-gray-300 text-center min-w-[85%] sm:min-w-xl lg:min-w-3xl p-2 text-white cursor-default"
						>
							Title Screen
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
