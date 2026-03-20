export function Container({
	children,
	width,
	className,
}: {
	children: React.ReactNode;
	width?: string;
	className?: string;
}) {
	return (
		<div
			className={`flex flex-col justify-center ${width || "w-full max-w-3xl"} p-4! mx-auto sm:p-8! mc-container ${className || ""}`}
		>
			{children}
		</div>
	);
}
