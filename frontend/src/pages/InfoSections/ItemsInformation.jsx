import { API_URL, FETCH_STATUS, PREFIX_MC } from "../../consts";
import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "../../components/AlertMessage";
import { useItems } from "../../services/useDatas";
import { MCTooltip } from "../../components/MCTooltip";
import { useTooltip } from "../../hooks/useTooltip";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { Filter } from "../../components/Filter";
import { useFilterData } from "../../hooks/useFilterData";
import { useQueryFilter } from "../../hooks/useQueryFilter";

const TIER_COLOR = {
	COMMON: "text-white",
	UNCOMMON: "text-[#ffff55]",
	RARE: "text-[#55ffff]",
	EPIC: "text-[#ff55ff]",
};

function getTierColor(tier) {
	switch (tier.toLowerCase()) {
		case "uncommon":
			return TIER_COLOR.UNCOMMON;
		case "rare":
			return TIER_COLOR.RARE;
		case "epic":
			return TIER_COLOR.EPIC;
		default:
			return TIER_COLOR.COMMON;
	}
}

function ItemInformation({ data, tooltip, onLoad }) {
	const isDesktop = window.matchMedia("(pointer: fine)").matches;

	const handleDesktop = () => {
		const path = `${API_URL}/items/${data.id}`;
		navigator.clipboard.writeText(path);
	};
	const handleMobile = (event) => {
		const newContent = getTooltipContent();
		const isSameContent =
			tooltip.content?.props?.children?.[0]?.props?.children ===
			newContent.props.children[0].props.children;

		if (isSameContent && tooltip.visible) {
			tooltip.setVisible(false);
		} else {
			tooltip.setContent(newContent);
			tooltip.setVisible(true);

			const rect = event.currentTarget.getBoundingClientRect();
			// Posición inicial a la derecha
			let x = rect.right + 8;
			let y = rect.top + rect.height / 2;

			// Ponemos posición provisional
			tooltip.setPosition({ x, y });

			// Esperamos un tick para que el tooltip se renderice en el DOM
			setTimeout(() => {
				const tooltipEl = document.querySelector(".mc-tooltip");
				if (!tooltipEl) return;

				const ttRect = tooltipEl.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;
				const padding = 8;

				// Ajustar horizontalmente: si se sale por la derecha, poner a la izquierda
				if (x + ttRect.width > viewportWidth) {
					x = rect.left - ttRect.width - padding;
				}
				if (x < 0) {
					x = padding;
				}

				// Ajustar verticalmente: si se sale por abajo, subir
				if (y + ttRect.height > viewportHeight) {
					y = viewportHeight - ttRect.height - padding;
				}
				if (y < 0) {
					y = padding;
				}

				tooltip.setPosition({ x, y });
			}, 0);
		}
	};

	const handleTooltipContent = () => {
		tooltip.setContent(getTooltipContent());
	};

	const getTooltipContent = () => (
		<div className="text-left">
			<h3 className={`${getTierColor(data.tier)} text-[16px]`}>{data.name}</h3>
			<span className="text-[#545454]">
				{PREFIX_MC}
				{data.id}
			</span>
			<div className="text-[#a0a0a0]">
				<p>{`Renewable: ${data.renewable ? "Yes" : "No"}`}</p>
				<p>{`Stackable: ${data.stackable}`}</p>
			</div>
			{isDesktop && <footer className="text-[#545454]">Click to GET</footer>}
		</div>
	);

	return (
		<button
			type="button"
			className="flex relative group cursor-pointer size-[48px] sm:size-[56px]"
			style={{ display: data.hidden ? "none" : "flex" }}
			onMouseEnter={() => {
				tooltip.setVisible(true);
				handleTooltipContent();
			}}
			onMouseLeave={() => tooltip.setVisible(false)}
			onClick={(event) => {
				if (isDesktop) handleDesktop();
				else handleMobile(event);
			}}
		>
			<figure className="flex flex-col bg-[#8b8b8b] border-2 border-gray-800 overflow-hidden justify-center">
				<img
					src={data.image}
					className="object-contain size-[40px] sm:size-[48px] m-auto"
					onLoad={onLoad}
					onError={onLoad}
					alt={`${data.id} sprite`}
				/>
			</figure>
		</button>
	);
}

export function ItemsInformation() {
	const { datas, status } = useItems();
	const { filteredDatas, filter, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("item", setFilter);
	const tooltip = useTooltip();
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(datas.length);

	return (
		<>
			<MCTooltip tooltip={tooltip} />
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
			{status === FETCH_STATUS.LOADED && (
				<>
					{!isAllImageLoaded && <AlertImageLoading />}
					<div
						className={`mc-container mx-auto max-w-7xl mt-7 flex flex-col items-center p-4 sm:p-8 ${
							isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
						}`}
					>
						<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Items</h1>
						<Filter data="item" value={filter} onChange={updateFilter} />
						<div className="w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-2 justify-center items-center">
							{filteredDatas.map((data) => (
								<ItemInformation
									key={data.id}
									data={data}
									tooltip={tooltip}
									onLoad={addImageLoaded}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}
