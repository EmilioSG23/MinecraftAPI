import { API_URL, FETCH_STATUS } from "../../consts";
import { AlertErrorMessage, AlertLoadingMessage } from "../../components/AlertMessage";
import { useStructures } from "../../services/useDatas";


export function StructuresInformation() {
    const {datas, status} = useStructures()
  
    return (
      <>
      {status === FETCH_STATUS.LOADING && <AlertLoadingMessage/>}
      {status === FETCH_STATUS.ERROR && <AlertErrorMessage/>}
      {status === FETCH_STATUS.LOADED &&
        <div className='mc-container mx-auto max-w-7xl mt-7 flex flex-col justify-center p-8'>
          <h1 className='font-bold text-[40px] text-center'>Structures</h1>
          <div className='w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-10 justify-center'>
            {datas.map((data) => {
              return(
                <div key={data.id} className='flex flex-col gap-x-1 w-[32%] mx-1 bg-gray-500 rounded-2xl border-3 border-gray-800 overflow-hidden justify-center'>
                  <img loading = "lazy" src = {data.image} className='bg-[#c7c7c7] object-contain h-[200px]'/>
                  <h2 className = "text-center font-bold text-[26px] text-white border-t-3 border-gray-800">{data.name}</h2>
                  <span className = "text-center -translate-y-2 text-gray-300">{`minecraft:${data.id}`}</span>
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
      }
      </>
    )
  }