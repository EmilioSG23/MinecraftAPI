import { CopyGetButton } from "@/components/information/shared/CopyGetButton";
import type { EntityWithImage } from "@/services/useDatas";
import type { Advancement } from "@/types/advancement.interface";
import { API_URL } from "@/utils/consts";
import type { SyntheticEvent } from "react";

interface AdvancementCardProps {
	data: EntityWithImage<Advancement>;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

interface FrameStyle {
	bg: string;
	bgHover: string;
}

function getFrame(tier: string): FrameStyle {
	if (tier === "Challenge") {
		return {
			bg: "bg-[url(/information/challenge_frame.png)]",
			bgHover: "group-hover:bg-[url(/information/challenge_frame_obtained.png)]",
		};
	}
	if (tier === "Goal") {
		return {
			bg: "bg-[url(/information/goal_frame.png)]",
			bgHover: "group-hover:bg-[url(/information/goal_frame_obtained.png)]",
		};
	}
	return {
		bg: "bg-[url(/information/advancement_frame.png)]",
		bgHover: "group-hover:bg-[url(/information/advancement_frame_obtained.png)]",
	};
}

/** Renders an advancement row card. */
export function AdvancementCard({ data, onLoad }: AdvancementCardProps) {
	const { bg, bgHover } = getFrame(data.tier);
	const bgClass = `${bg} ${bgHover}`;

	return (
		<div className="flex gap-x-1 group">
			<figure
				className={`flex justify-center items-center p-3 size-15 sm:size-25 group-hover:scale-110 ${bgClass}`}
				style={{
					imageRendering: "pixelated",
					objectFit: "cover",
					backgroundSize: "100% 100%",
				}}
			>
				<img
					src={data.image}
					className="h-8 sm:h-16"
					loading="lazy"
					onLoad={onLoad}
					onError={onLoad}
					width={64}
					height={64}
					alt={`${data.id} sprite`}
				/>
			</figure>
			<div className="flex-1 *:px-5">
				<h2 className="bg-[#046a95] border-4 border-black text-white rounded-lg text-[20px] sm:text-[32px] group-hover:bg-[#aa7e0f] group-hover:border-[#8b670c]">
					{data.title}
				</h2>
				<p
					className={`bg-[#202020] border-4 border-[#555555] rounded-lg text-[12px] sm:text-[24px] ${
						data.tier === "Challenge"
							? "text-purple-600"
							: data.tier === "Goal"
								? "text-yellow-400"
								: "text-green-600"
					}`}
				>
					{data.description}
				</p>
			</div>
			<CopyGetButton
				path={`${API_URL}/advancements/${data.id}`}
				className="cursor-pointer flex flex-col bg-gray-300 text-center border-2 border-black rounded-lg items-center justify-center w-[64] hover:border-white"
				iconClassName="fa-regular fa-copy text-[28px] sm:text-[56px] px-2"
			/>
		</div>
	);
}
