/** Reusable centered container with the Minecraft UI framing styles. */
/**
 * Wraps content inside the project-standard framed container.
 *
 * @param props.children Nested content.
 * @param props.width Optional width utility classes for the outer wrapper.
 * @param props.className Optional extra utility classes.
 * @returns Styled container element.
 */
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
