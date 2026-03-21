import type {
	TerminalCommandListBlock,
	TerminalCommandOutput,
	TerminalJsonBlock,
	TerminalTextBlock,
} from "@/features/terminal/types";

function getToneClassName(tone: TerminalTextBlock["tone"] = "default") {
	if (tone === "error") return "text-red-500";
	if (tone === "success") return "text-lime-500";
	if (tone === "muted") return "text-gray-300";
	return "text-white";
}

function renderTextBlock(block: TerminalTextBlock, index: number) {
	const className =
		`${getToneClassName(block.tone)} ${block.weight === "bold" ? "font-bold" : ""}`.trim();
	return (
		<p className={className} key={`text-${index}`}>
			{block.text}
		</p>
	);
}

function renderJsonBlock(block: TerminalJsonBlock, index: number) {
	return (
		<pre className="whitespace-pre-wrap" key={`json-${index}`}>
			{JSON.stringify(block.data, null, 2)}
		</pre>
	);
}

function renderCommandListBlock(block: TerminalCommandListBlock, index: number) {
	return (
		<div className="space-y-2" key={`commands-${index}`}>
			<dl>
				{block.commands.map((command) => (
					<div key={command.name} className="mb-2">
						<span className="font-semibold">
							{command.name} {command.params ?? null}
						</span>
						<span className="ml-2! text-sm text-gray-300">{command.description}</span>
					</div>
				))}
			</dl>
		</div>
	);
}

interface TerminalOutputRendererProps {
	output: TerminalCommandOutput;
}

export function TerminalOutputRenderer({ output }: TerminalOutputRendererProps) {
	return (
		<>
			{output.blocks.map((block, index) => {
				if (block.type === "text") return renderTextBlock(block, index);
				if (block.type === "json") return renderJsonBlock(block, index);
				return renderCommandListBlock(block, index);
			})}
		</>
	);
}
