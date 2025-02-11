import { API_URL, FETCH_STATUS } from "../../consts";
import { AlertErrorMessage, AlertLoadingMessage } from "../../components/AlertMessage";
import { useItems } from "../../services/useDatas";
import { MCTooltip } from "../../components/MCTooltip";
import { useTooltip } from "../../hooks/useTooltip";

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

function ItemInformation({data, tooltip}){
    return (
        <button className="flex relative group cursor-pointer"
             onMouseEnter={() => {
                tooltip.setContent(
                     <div className="text-left">
                         <h2 className={getTierColor(data.tier)+" text-[16px]"}>{data.name}</h2>
                         <span className="text-[#545454]">minecraft:{data.id}</span>
                         <p className="text-[#a0a0a0]">
                             {`Renewable: ${data.renewable ? "Yes" : "No"} - Stackable: ${data.stackable}`}
                         </p>
                         <span className="text-[#545454]">Click to GET</span>
                     </div>
                 );
                 tooltip.setVisible(true);
             }}
             onMouseLeave={() => tooltip.setVisible(false)}
             onClick={() => {
                const path = `${API_URL}/items/${data.id}`;
                navigator.clipboard.writeText(path);
             }}>
            <div className="flex flex-col mx-1 bg-[#8b8b8b] border-2 border-gray-800 overflow-hidden justify-center">
                <img loading="lazy" src={data.image} className="object-contain w-[48px] h-[48px] m-auto" />
            </div>
        </button>
    );
}

export function ItemsInformation() {
    const { datas, status } = useItems();
    const tooltip = useTooltip();

    return (
        <>
        <MCTooltip tooltip={tooltip}/>
        {status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
        {status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
        {status === FETCH_STATUS.LOADED && (
            <div className="mc-container mx-auto max-w-7xl mt-7 flex flex-col justify-center p-8">
                <h1 className="font-bold text-[40px] text-center">Items</h1>
                <div className="w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-1 justify-center">
                    {datas.map((data) => (
                        <ItemInformation key={data.id} data={data} tooltip={tooltip}/>
                    ))}
                </div>
            </div>
        )}
        </>
    );
}
