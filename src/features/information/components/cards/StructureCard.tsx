/** Card used to render structure information. */
import { API_URL } from "@/config/config";
import { CopyGetButton } from "@/features/information/components/common/CopyGetButton";
import type { EntityWithImage } from "@/features/information/hooks/useInformationData";
import { PREFIX_MC } from "@/shared/minecraft/constants";
import type { Structure } from "@/shared/minecraft/types";
import type { SyntheticEvent } from "react";

interface StructureCardProps {
	data: EntityWithImage<Structure>;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Renders a structure detail card.
 *
 * @param props.data Structure payload enriched with its image URL.
 * @param props.onLoad Image load callback propagated by the list view.
 * @returns Structure card with preview image and copy action.
 */
export function StructureCard({ data, onLoad }: StructureCardProps) {
	return (
		<div className="flex flex-col max-h-78.5 gap-x-1 w-full sm:w-[45%] lg:w-[32%] mx-1 bg-gray-500 rounded-2xl border-3 border-gray-800 overflow-hidden justify-center">
			<img
				src={data.image}
				className="bg-[#afafaf] object-contain w-full h-50"
				loading="lazy"
				onLoad={onLoad}
				onError={onLoad}
				height={200}
				alt={`${data.id} sprite`}
			/>
			<h2 className="text-center font-bold text-[20px] sm:text-[26px] text-white border-t-3 border-gray-800">
				{data.name}
			</h2>
			<span className="text-center text-gray-300 -translate-y-2">{`${PREFIX_MC}${data.id}`}</span>
			<CopyGetButton
				path={`${API_URL}/structures/${data.id}`}
				className="flex items-center self-center justify-center w-1/2 mb-2! text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white"
				iconClassName="fa-regular fa-copy text-[16px] px-2!"
				labelClassName="text-[20px]"
			/>
		</div>
	);
}
