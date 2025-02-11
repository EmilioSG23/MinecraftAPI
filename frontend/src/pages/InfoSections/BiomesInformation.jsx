import { API_URL, FETCH_STATUS } from "../../consts";
import { AlertErrorMessage, AlertLoadingMessage } from "../../components/AlertMessage";
import { useBiomes } from "../../services/useDatas";
import { MCTooltip } from "../../components/MCTooltip";
import { useTooltip } from "../../hooks/useTooltip";

function BiomeItemInformation({ children, label, tooltip}) {
  return (
      <div className="flex relative gap-x-2 border-2 border-white px-1 rounded-lg w-[20%] justify-center items-center"
           onMouseEnter={() => {
              tooltip.setVisible(true);
               tooltip.setContent(<>{label}</>);
           }}
           onMouseLeave={() => tooltip.setVisible(false)}>
          {children}
      </div>
  );
}

  
export function BiomesInformation() {
    const {datas, status} = useBiomes()
    const tooltip = useTooltip();
  
    return (
      <>
      <MCTooltip tooltip={tooltip}/>
      {status === FETCH_STATUS.LOADING && <AlertLoadingMessage/>}
      {status === FETCH_STATUS.ERROR && <AlertErrorMessage/>}
      {status === FETCH_STATUS.LOADED &&
        <div className='mc-container mx-auto max-w-7xl mt-7 flex flex-col justify-center p-8'>
          <h1 className='font-bold text-[40px] text-center'>Biomes</h1>
          <div className='w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-10 justify-center'>
            {datas.map((data) => {
              return(
                <div key={data.id} className='flex flex-col gap-x-1 w-[32%] mx-1 bg-green-600 rounded-2xl border-3 border-green-900 overflow-hidden justify-center'>
                  <img loading = "lazy" src = {data.image} className='w-[384px] h-[200px]'/>
                  <h2 className = "text-center font-bold text-[26px] text-white border-t-3 border-green-900">{data.name}</h2>
                  <span className = "text-center -translate-y-2 text-gray-700">{`minecraft:${data.id}`}</span>
                  <div className = "flex items-center justify-center mb-3 gap-x-5 text-gray-200 text-[20px]">
                    <BiomeItemInformation tooltip={tooltip} label = "Temperature">
                      <i className = "fa-solid fa-temperature-half text-amber-800"/>
                      <span>{data.temperature}</span>
                    </BiomeItemInformation>
                    <BiomeItemInformation tooltip={tooltip} label = "Downfall">
                      <i className = "fa-solid fa-mountain text-white"/>
                      <span>{data.downfall}</span>
                    </BiomeItemInformation>
                    <BiomeItemInformation tooltip={tooltip} label = "Precipitation">
                      <i className = "fa-solid fa-cloud-rain text-blue-300"/>
                      <span>{data.precipitation ? "Yes":"No"}</span>
                    </BiomeItemInformation>
                  </div>
                  <a className='flex bg-gray-300 text-center self-center border-2 border-black rounded-lg items-center justify-center w-1/2 hover:border-white mb-2'
                    onClick = {() => {
                      const path = `${API_URL}/biomes/${data.id}`
                      navigator.clipboard.writeText(path)
                    }}>
                      <i className='fa-regular fa-copy text-[16px] px-2'/>
                    <span className='text-[20px]'>GET</span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      }
      </>
    )
}