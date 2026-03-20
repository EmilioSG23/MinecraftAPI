import { Logo } from "@/components/Logo";
import { useChangeSection } from "@/hooks/useSection";
import Link from "next/link";

interface SelectorProps {
	id: string;
	name: string;
}

function Selector({ id, name }: SelectorProps) {
	return (
		<>
			<Link
				href={`/${id}`}
				className="mc-selector text-[20px] sm:text-[30px] lg:text-[40px] max-w-3xl bg-gray-300 text-center w-full p-2 text-white cursor-default"
			>
				{name}
			</Link>
		</>
	);
}

export function Menu() {
	useChangeSection("home");
	return (
		<div className="h-[80vh] w-full flex flex-col items-center justify-center gap-20">
			<Logo />
			<div className="flex flex-col items-center justify-center w-full px-8! my-32 gap-y-5">
				<Selector id="information" name="Information" />
				<Selector id="terminal" name="Terminal" />
				<Selector id="documentation" name="Documentation" />
			</div>
		</div>
	);
}
