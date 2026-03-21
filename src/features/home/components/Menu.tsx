/** Main menu shown on the homepage. */
import { Logo } from "@/features/home/components/Logo";
import { useChangeSection } from "@/shared/hooks/useSection";
import Link from "next/link";

interface SelectorProps {
	id: string;
	name: string;
}

/**
 * Renders a single menu selector button.
 *
 * @param props.id Target route segment.
 * @param props.name Label shown to the user.
 * @returns Link styled as a Minecraft selector.
 */
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

/**
 * Renders the landing menu and marks the home section as active.
 *
 * @returns Home menu with logo and navigation shortcuts.
 */
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

