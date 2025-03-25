import "./App.css";
import { Menu } from "./pages/Menu";
import { Information } from "./pages/Information";
import { Terminal } from "./pages/Terminal";
import { Documentation } from "./pages/Documentation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Background } from "./components/Background";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { ConfigButton } from "./components/ConfigButton";
import { useConfigBackground } from "./hooks/useConfigBackground";

function SelectionSoundEffect() {
	useEffect(() => {
		const sound = new Audio("/gui/selection.m4a");
		const handleClick = (event) => {
			const anchor = event.target.closest("a, button");
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

function App() {
	const { panorama, blur, displayMode, changePanorama, changeBlur, changeDisplayMode } =
		useConfigBackground();

	return (
		<main className="overflow-x-hidden">
			<SelectionSoundEffect />
			<Background panorama={panorama} blur={blur} />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/information/*" element={<Information />} />
					<Route
						path="/terminal"
						element={
							<Terminal
								setPanorama={changePanorama}
								setBlur={changeBlur}
								setDisplayMode={changeDisplayMode}
							/>
						}
					/>
					<Route path="/documentation" element={<Documentation />} />
					<Route path="/*" element={<Menu />} />
				</Routes>
			</BrowserRouter>
			<ConfigButton
				panorama={panorama}
				blur={blur}
				setPanorama={changePanorama}
				setBlur={changeBlur}
				display={displayMode}
				setDisplayMode={changeDisplayMode}
			/>
		</main>
	);
}

export default App;
