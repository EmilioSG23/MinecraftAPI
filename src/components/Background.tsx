import { useActiveSection } from "@/hooks/useSection";

interface BackgroundProps {
	panorama: number;
	blur: number;
}

export function Background({ panorama, blur }: BackgroundProps) {
	const { activeSection } = useActiveSection();
	return (
		<>
			<div
				className="fixed -z-40 bg-black/25 h-full w-full top-0 left-0 pointer-events-none backdrop-blur-[0px]"
				style={{ filter: `blur(${activeSection === "home" ? 0 : blur}px)` }}
			/>
			<div
				className="background fixed -z-50 bg-black h-full w-full top-0 left-0 pointer-events-none"
				style={{
					backgroundImage: `url('/panorama/panorama_${panorama}.webp')`,
				}}
			/>
		</>
	);
}
