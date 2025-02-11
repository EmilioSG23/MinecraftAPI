import { Routes, Route, Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { DATAS_TYPE } from '../consts'
import {AdvancementsInformation} from './InfoSections/AdvancementsInformation'
import {BiomesInformation} from './InfoSections/BiomesInformation'
import {ItemsInformation} from './InfoSections/ItemsInformation'
import {StructuresInformation} from './InfoSections/StructuresInformation'
import { AlertMessage } from '../components/AlertMessage'

function InfoHomeCard({ id }) {
  return (
    <Link to={`/information/${id}`} className="bg-green-500 flex items-center p-1 gap-x-5 rounded-lg border-3 border-green-900 hover:outline-4 outline-black">
      <img src={`/information/${id}.png`} className="info-card w-[96px] h-[96px]" />
      <div className="text-left">
        <h2 className="uppercase text-white text-[40px] font-bold">{id}</h2>
        <span className="italic text-[20px] text-gray-700">Click to see information about all the {id}</span>
      </div>
    </Link>
  )
}

function InformationHome() {
  return (
    <div className="mc-container mx-auto max-w-3xl mt-7 flex flex-col justify-center p-8">
        <h2 className="text-red-700 text-[32px] font-bold text-center">Choose a section for information</h2>
        <div className="flex flex-col gap-y-2 mt-5">
          {DATAS_TYPE.map(dataType => (
            <InfoHomeCard key={dataType} id={dataType} />
          ))}
        </div>
    </div>
  )
}

export function Information() {
  return (
    <>
      <Header initialSection="information" />
      <Routes>
        <Route index element={<InformationHome />} />
        <Route path="/advancements" element = {<AdvancementsInformation />}/>
        <Route path="/biomes" element = {<BiomesInformation />}/>
        <Route path="/blocks" element = {<AlertMessage message = "There is not information available yet :("/>}/>
        <Route path="/items" element = {<ItemsInformation/>}/>
        <Route path="/mobs" element = {<AlertMessage message = "There is not information available yet :("/>}/>
        <Route path="/structures" element = {<StructuresInformation />}/>
      </Routes>
    </>
  )
}