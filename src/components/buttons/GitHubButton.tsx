import { GitHubIcon } from "@/icons/GitHubIcon";

export function GitHubButton() {
	return (
		<a
			href="https://github.com/EmilioSG23/MinecraftAPI"
			target="_blank"
			rel="noreferrer"
			type="button"
			className="mc-mini-selector fixed bottom-5 right-5 cursor-pointer"
		>
			<GitHubIcon className="p-2 size-12" role="img" aria-label="GitHub repository" />
		</a>
	);
}
