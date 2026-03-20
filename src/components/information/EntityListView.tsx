"use client";

import { AlertErrorMessage, AlertLoadingMessage } from "@/components/AlertMessage";
import { Container } from "@/components/Container";
import { Filter } from "@/components/Filter";
import { Tooltip } from "@/components/Tooltip";
import { useFilterData } from "@/hooks/useFilterData";
import { useQueryFilter } from "@/hooks/useQueryFilter";
import { useChangeSection } from "@/hooks/useSection";
import { useTooltip } from "@/hooks/useTooltip";
import type { EntityWithImage, UseFetchResult } from "@/services/useDatas";
import type { TooltipType } from "@/types/tooltip.interface";
import { FETCH_STATUS } from "@/utils/consts";

interface EntityListViewProps<T extends { id: string }> {
	title: string;
	filterDataName: string;
	queryParam: string;
	useData: () => UseFetchResult<T>;
	renderCard: (params: {
		data: EntityWithImage<T>;
		onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
		tooltip: TooltipType;
	}) => React.ReactNode;
	filterKey?: string;
	containerClassName?: string;
	listClassName?: string;
	showTooltip?: boolean;
	onRenderTopControls?: (ctx: {
		setFilter: (key: string, value: string) => void;
		filters: Record<string, string>;
	}) => React.ReactNode;
	sectionName?: string;
	virtualizationThreshold?: number;
	batchSize?: number;
}

/**
 * Generic information list renderer used by all entity pages.
 */
export function EntityListView<T extends { id: string }>({
	title,
	filterDataName,
	queryParam,
	useData,
	renderCard,
	filterKey = "name",
	containerClassName,
	listClassName = "w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-y-2 justify-center items-center",
	showTooltip = false,
	onRenderTopControls,
	sectionName = "information",
}: EntityListViewProps<T>) {
	useChangeSection(sectionName);

	const { datas, status, errorMessage, refetch } = useData();
	const { filteredDatas, filters, setFilter } = useFilterData(datas, filterKey);
	const { updateFilter } = useQueryFilter(queryParam, setFilter, filterKey);
	const tooltip = useTooltip();

	return (
		<>
			{showTooltip && <Tooltip tooltip={tooltip} />}
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && (
				<AlertErrorMessage message={errorMessage || undefined} onRetry={refetch} />
			)}
			{status === FETCH_STATUS.LOADED && (
				<>
					<Container width="w-full" className={` ${containerClassName || ""}`}>
						<div className="w-full flex flex-col justify-center items-center gap-4 overflow-hidden">
							<h1 className="font-bold text-[20px] sm:text-[40px] text-center">{title}</h1>
							{onRenderTopControls?.({ setFilter, filters })}
							<Filter
								data={filterDataName}
								value={filters[filterKey] || ""}
								onChange={updateFilter}
							/>
							<div className={listClassName}>
								{filteredDatas.map((data) => (
									<>{renderCard({ data, onLoad: () => {}, tooltip })}</>
								))}
							</div>
						</div>
					</Container>
				</>
			)}
		</>
	);
}
