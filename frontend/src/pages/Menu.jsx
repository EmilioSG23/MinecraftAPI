import { Logo } from "../components/Logo";
import { Link } from "react-router-dom";
import { useChangeSection } from "../hooks/useSection.jsx";

function Selector(props) {
	const { id, name } = props;

	return (
		<>
			<Link
				to={"/" + id}
				className="mc-selector text-[40px] bg-gray-300 text-center min-w-3xl p-2 text-white cursor-default"
			>
				{name}
			</Link>
		</>
	);
}

export function Menu() {
	useChangeSection("home");
	return (
		<div className="py-20">
			<Logo />
			<div className="flex flex-col items-center justify-center my-32 gap-y-5">
				<Selector id="information" name="Information" />
				<Selector id="terminal" name="Terminal" />
				<Selector id="documentation" name="Documentation" />
			</div>
		</div>
	);
}
