import GitHub from "../icons/github.svg";

export function GitHubButton() {
	return (
		<a
			href="https://github.com/EmilioSG23/MinecraftAPI"
			target="_blank"
			type="button"
			className="mc-mini-selector fixed bottom-5 right-5 cursor-pointer"
		>
			<img
				src={GitHub}
				className="p-2 w-[48x] h-[48px]"
				alt="Config button for custom blur, panorama and display mode"
			/>
		</a>
	);
}
