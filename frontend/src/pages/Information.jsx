import { Routes, Route, Link } from "react-router-dom";
import { DATAS_TYPE } from "../consts";
import { AdvancementsInformation } from "./InfoSections/AdvancementsInformation";
import { BiomesInformation } from "./InfoSections/BiomesInformation";
import { BlocksInformation } from "./InfoSections/BlocksInformation";
import { ItemsInformation } from "./InfoSections/ItemsInformation";
import { StructuresInformation } from "./InfoSections/StructuresInformation";
import { AlertMessage } from "../components/AlertMessage";
import { useChangeSection } from "../hooks/useSection.jsx";

function InfoHomeCard({ id }) {
	return (
		<Link
			to={`/information/${id}`}
			className="flex items-center p-1 bg-green-500 border-green-900 rounded-lg gap-x-5 border-3 hover:outline-4 outline-black"
		>
			<img src={`/information/${id}.png`} className="info-card w-[96px] h-[96px]" />
			<div className="text-left">
				<h2 className="uppercase text-white text-[40px] font-bold">{id}</h2>
				<span className="italic text-[20px] text-gray-700">Click to see information about all the {id}</span>
			</div>
		</Link>
	);
}

function InformationHome() {
	return (
		<div className="flex flex-col justify-center max-w-3xl p-8 mx-auto mc-container mt-7">
			<h1 className="text-red-700 text-[32px] font-bold text-center">Choose a section for information</h1>
			<article className="flex flex-col mt-5 gap-y-2">
				{Object.values(DATAS_TYPE).map((dataType) => (
					<InfoHomeCard key={dataType} id={dataType} />
				))}
			</article>
		</div>
	);
}

export function Information() {
	useChangeSection("information");

	return (
		<section>
			<Routes>
				<Route index element={<InformationHome />} />
				<Route path="/advancements" element={<AdvancementsInformation />} />
				<Route path="/biomes" element={<BiomesInformation />} />
				<Route path="/blocks" element={<BlocksInformation />} />
				<Route path="/items" element={<ItemsInformation />} />
				<Route path="/mobs" element={<AlertMessage message="There is not information available yet :(" />} />
				<Route path="/structures" element={<StructuresInformation />} />
			</Routes>
		</section>
	);
}
