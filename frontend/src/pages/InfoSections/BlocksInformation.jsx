import { API_URL, FETCH_STATUS, PREFIX_MC } from "../../consts";
import { AlertErrorMessage, AlertImageLoading, AlertLoadingMessage } from "../../components/AlertMessage";
import { useBlocks } from "../../services/useDatas";
import { MCTooltip } from "../../components/MCTooltip";
import { useTooltip } from "../../hooks/useTooltip";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { useFilterData } from "../../hooks/useFilterData";
import { Filter } from "../../components/Filter";

const TIER_COLOR = {
    COMMON: "text-white",
    UNCOMMON: "text-[#ffff55]",
    RARE: "text-[#55ffff]",
    EPIC: "text-[#ff55ff]"
}

function getTierColor(tier){
    switch(tier.toLowerCase()){
        case "uncommon":
            return TIER_COLOR.UNCOMMON
        case "rare":
            return TIER_COLOR.RARE
        case "epic":
            return TIER_COLOR.EPIC
        default:
            return TIER_COLOR.COMMON
    }
}

function BlockInformation({data, tooltip, onLoad}){
    return (
        <button className="cursor-pointer w-[56px] h-[56px]" style= {{display: data.hidden ? "none" : "flex"}}
             onMouseEnter={() => {
                tooltip.setContent(
                     <div className="text-left">
                         <h2 className={getTierColor(data.tier)+" text-[16px]"}>{data.name}</h2>
                         <small className="text-[#545454]">{PREFIX_MC}{data.id}</small>
                         <div className="text-[#a0a0a0]">
                            <p>{`Renewable: ${data.renewable ? "Yes" : "No"}`}</p>
                            <p>{`Stackable: ${data.stackable}`}</p>
                            <p>{`Tool: ${data.tool}`}</p>
                            <p>{`Blast Resistance: ${data.blastResistance}`}</p>
                            <p>{`Hardness: ${data.hardness}`}</p>
                            <p>{`Luminous: ${data.luminous}`}</p>
                            <p>{`Transparent: ${data.transparent}`}</p>
                            <p>{`Flammable: ${data.flammable}`}</p>
                            <p>{`Water Loggeable: ${data.waterloggeable}`}</p>
                         </div>
                         <span className="text-[#545454]">Click to GET</span>
                     </div>
                 );
                 tooltip.setVisible(true);
             }}
             onMouseLeave={() => tooltip.setVisible(false)}
             onClick={() => {
                const path = `${API_URL}/blocks/${data.id}`;
                navigator.clipboard.writeText(path);
             }}>
            <div className="flex flex-col bg-[#8b8b8b] border-2 border-gray-800 overflow-hidden justify-center">
                <img src={data.image} className="object-contain w-[48px] h-[48px] m-auto" onLoad={onLoad} onError={onLoad}/>
            </div>
        </button>
    );
}

export function BlocksInformation() {
    const { datas, status } = useBlocks();
    const {filteredDatas, filter, setFilter} = useFilterData(datas)
    const tooltip = useTooltip();
    const {isAllImageLoaded, addImageLoaded} = useImageLoaded(datas.length)

    return (
        <>
        <MCTooltip tooltip={tooltip}/>
        {status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
        {status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
        {status === FETCH_STATUS.LOADED && (
            <>
            {!isAllImageLoaded && <AlertImageLoading />}
            <div className={`mc-container mx-auto max-w-7xl mt-7 flex flex-col items-center p-8 ${
                    isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}>
                <h1 className="font-bold text-[40px] text-center">Blocks</h1>
                <Filter data = "block" value = {filter} onChange={setFilter}/>
                <div className="w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-2 justify-center">
                    {filteredDatas.map((data) => (
                        <BlockInformation key={data.id} data={data} tooltip={tooltip} onLoad = {addImageLoaded} />
                    ))}
                </div>
            </div>
            </>
        )}
        </>
    );
}
