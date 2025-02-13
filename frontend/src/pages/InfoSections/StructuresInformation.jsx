import { API_URL, FETCH_STATUS, PREFIX_MC } from "../../consts";
import { AlertErrorMessage, AlertImageLoading, AlertLoadingMessage } from "../../components/AlertMessage";
import { useStructures } from "../../services/useDatas";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { Filter } from "../../components/Filter";
import { useFilterData } from "../../hooks/useFilterData";


export function StructuresInformation() {
    const {datas, status} = useStructures()
    const {filteredDatas, filter, setFilter} = useFilterData(datas)
    const {isAllImageLoaded, addImageLoaded} = useImageLoaded(datas.length)
  
    return (
      <>
      {status === FETCH_STATUS.LOADING && <AlertLoadingMessage/>}
      {status === FETCH_STATUS.ERROR && <AlertErrorMessage/>}
      {status === FETCH_STATUS.LOADED &&
      <>
        {!isAllImageLoaded && <AlertImageLoading />}
        <div className={`mc-container mx-auto max-w-7xl mt-7 flex flex-col items-center p-8 ${
                    isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}>
          <h1 className='font-bold text-[40px] text-center'>Structures</h1>
          <Filter data = "structure" value = {filter} onChange={setFilter}/>
          <div className='w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-10 justify-center'>
            {filteredDatas.map((data) => {
              return(
                <div key={data.id} className='flex flex-col gap-x-1 w-[32%] mx-1 bg-gray-500 rounded-2xl border-3 border-gray-800 overflow-hidden justify-center' 
                  style = {{display: data.hidden ? "none" : "flex"}}>
                  <img src = {data.image} className='bg-[#c7c7c7] object-contain h-[200px]' onLoad={addImageLoaded} onError={addImageLoaded}/>
                  <h2 className = "text-center font-bold text-[26px] text-white border-t-3 border-gray-800">{data.name}</h2>
                  <span className = "text-center -translate-y-2 text-gray-300">{`${PREFIX_MC}${data.id}`}</span>
                  <a className='flex bg-gray-300 text-center self-center border-2 border-black rounded-lg items-center justify-center w-1/2 hover:border-white mb-2'
                    onClick = {() => {
                      const path = `${API_URL}/structures/${data.id}`
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
        </>
      }
      </>
    )
  }