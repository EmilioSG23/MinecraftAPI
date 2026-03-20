/** Detailed card used to render mob information and hitbox tooltips. */
import { CopyGetButton } from "@/components/information/shared/CopyGetButton";
import type { EntityWithImage } from "@/services/useDatas";
import type { Mob } from "@/types/mob.interface";
import type { TooltipType } from "@/types/tooltip.interface";
import { API_URL, PREFIX_MC } from "@/utils/consts";
import type { SyntheticEvent } from "react";

interface MobCardProps {
	data: EntityWithImage<Mob>;
	tooltip: TooltipType;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

interface TypeStyle {
	header: string;
	bg?: string;
	hover: string;
}

const TYPE_STYLES: Record<string, TypeStyle> = {
	ALL: { header: "bg-gray-600/25", hover: "hover:bg-gray-600/50" },
	PASSIVE: { header: "text-black bg-black/25", bg: "bg-black/10", hover: "hover:bg-black/50" },
	NEUTRAL: {
		header: "text-[#ffff55] bg-yellow-700/25",
		bg: "bg-yellow-700/10",
		hover: "hover:bg-yellow-700/50",
	},
	HOSTILE: {
		header: "text-white bg-red-600/25",
		bg: "bg-red-600/10",
		hover: "hover:bg-red-600/50",
	},
	BOSS: {
		header: "text-[#ff55ff] bg-gray-700",
		bg: "bg-gray-700/25",
		hover: "hover:bg-gray-700/50",
	},
};

/**
 * Returns the visual style associated with a mob behavior category.
 *
 * @param type Mob behavior label.
 * @returns Header, background and hover classes for the card.
 */
export function getMobTypeStyle(type: string): TypeStyle {
	const key = type?.toUpperCase?.() || "ALL";
	return TYPE_STYLES[key] || TYPE_STYLES.ALL;
}

/**
 * Renders a mob detail card with hover tooltip for hitboxes.
 *
 * @param props.data Mob payload enriched with its image URL.
 * @param props.tooltip Shared tooltip controller.
 * @param props.onLoad Image load callback propagated by the list view.
 * @returns Mob card with copy action and hoverable hitbox details.
 */
export function MobCard({ data, tooltip, onLoad }: MobCardProps) {
	return (
		<article className="w-full sm:w-[45%] lg:w-[30%] flex-col rounded-xl border border-black overflow-hidden max-h-61.75 flex">
			<h2
				className={`w-full text-center font-bold border-b border-black p-1 text-xl ${getMobTypeStyle(data.behavior).header}`}
			>
				{data.name}
			</h2>
			<div className="w-full flex flex-col xs:flex-row">
				<figure
					className={`flex-1 min-w-1/3 h-full border-b xs:border-b-0 xs:border-r border-black p-1 sm:p-2 flex items-center justify-center ${getMobTypeStyle(data.behavior).bg}`}
				>
					<img
						src={data.image}
						className="object-cover xs:object-contain size-18 xs:size-48 mx-auto"
						loading="lazy"
						onLoad={onLoad}
						onError={onLoad}
						width={192}
						height={192}
						alt={`${data.name} mob image`}
						onMouseEnter={() => {
							tooltip.setVisible(true);
							tooltip.setContent(
								<>
									<h3 className="font-bold text-left underline italic">Hitboxes</h3>
									{Object.values(data.hitbox).map(
										(hitbox: Mob["hitbox"][number], index: number) => (
											<div key={`${data.id}-${index}`} className="text-left gap-x-5">
												{hitbox.state && (
													<span>
														<b>{hitbox.state}</b>
														{" - "}
													</span>
												)}
												<span>
													<b>h: </b>
													{hitbox.height}
													{" - "}
												</span>
												<span>
													<b>w: </b>
													{hitbox.width}
												</span>
											</div>
										),
									)}
								</>,
							);
						}}
						onMouseLeave={() => tooltip.setVisible(false)}
					/>
				</figure>
				<div className="flex flex-2 flex-col justify-between">
					<div className="p-1 text-sm">
						<p className="text-gray-800 underline">{PREFIX_MC + data.id}</p>
						<p>
							<b>Health: </b>
							{data.health_points} pts
						</p>
						<p>
							<b>Behavior: </b>
							{data.behavior}
						</p>
						<p>
							<b>Type: </b>
							{data.type.join(", ")}
						</p>
						{data.speed && (
							<p>
								<b>Speed: </b>
								{data.speed}
							</p>
						)}
					</div>
					<CopyGetButton
						path={`${API_URL}/mobs/${data.id}`}
						className="flex items-center self-center justify-center w-2/3 mb-2 text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white"
						iconClassName="fa-regular fa-copy text-[16px] px-2"
						labelClassName="text-[20px]"
					/>
				</div>
			</div>
		</article>
	);
}
