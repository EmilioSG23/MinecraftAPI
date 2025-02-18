import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeaderProvider } from "./hooks/HeaderProvider";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HeaderProvider>
			<App />
		</HeaderProvider>
	</StrictMode>
);
