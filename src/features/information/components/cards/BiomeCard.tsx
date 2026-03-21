/** Detailed card used to render biome information. */
import { API_URL } from "@/config/config";
import { CopyGetButton } from "@/features/information/components/common/CopyGetButton";
import type { EntityWithImage } from "@/features/information/hooks/useInformationData";
import type { TooltipState } from "@/features/information/types";
import { PREFIX_MC } from "@/shared/minecraft/constants";
import type { Biome } from "@/shared/minecraft/types";
import type { ReactNode, SyntheticEvent } from "react";

interface BiomeCardProps {
	data: EntityWithImage<Biome>;
	tooltip: TooltipState;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

interface BiomeItemInformationProps {
	children: ReactNode;
	label: string;
	tooltip: TooltipState;
}

/**
 * Renders a small biome stat pill that exposes its label through the shared tooltip.
 *
 * @param props.children Visible stat content.
 * @param props.label Tooltip label shown on hover.
 * @param props.tooltip Shared tooltip controller.
 * @returns Tooltip-aware biome stat element.
 */
function BiomeItemInformation({ children, label, tooltip }: BiomeItemInformationProps) {
	return (
		<div
			className="flex relative gap-x-2 border-2 border-white px-1 rounded-lg w-[30%] sm:w-[25%] md:w-[20%] justify-center items-center"
			onMouseEnter={() => {
				tooltip.setContent(<p>{label}</p>);
				tooltip.setVisible(true);
			}}
			onMouseLeave={() => tooltip.setVisible(false)}
		>
			{children}
		</div>
	);
}

/** Renders a biome detail card. */
export function BiomeCard({ data, tooltip, onLoad }: BiomeCardProps) {
	return (
		<article className="flex flex-col gap-x-1 w-full sm:w-[48%] lg:w-[32%] mx-1 bg-green-600 rounded-2xl border-3 border-green-900 overflow-hidden justify-center max-h-90">
			<img
				src={data.image}
				className="w-full h-50 object-cover"
				loading="lazy"
				onLoad={onLoad}
				onError={onLoad}
				width={384}
				height={200}
				alt={`${data.id} sprite`}
			/>
			<h2 className="text-center font-bold text-[20px] sm:text-[26px] text-white border-t-3 border-green-900">
				{data.name}
			</h2>
			<span className="text-center text-gray-700 -translate-y-2">{`${PREFIX_MC}${data.id}`}</span>
			<div className="flex items-center justify-center mb-3! gap-x-5 text-gray-200 text-[20px]">
				<BiomeItemInformation tooltip={tooltip} label="Temperature">
					<i className="fa-solid fa-temperature-half text-amber-800" />
					<span>{data.temperature}</span>
				</BiomeItemInformation>
				<BiomeItemInformation tooltip={tooltip} label="Downfall">
					<i className="text-white fa-solid fa-mountain" />
					<span>{data.downfall}</span>
				</BiomeItemInformation>
				<BiomeItemInformation tooltip={tooltip} label="Precipitation">
					<i className="text-blue-300 fa-solid fa-cloud-rain" />
					<span>{data.precipitation ? "Yes" : "No"}</span>
				</BiomeItemInformation>
			</div>
			<CopyGetButton
				path={`${API_URL}/biomes/${data.id}`}
				className="flex items-center self-center justify-center w-1/2 mb-2! text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white gap-x-2"
				iconClassName="fa-regular fa-copy text-[16px] px-2"
				labelClassName="text-[20px]"
			/>
		</article>
	);
}
