import { API_URL, FETCH_STATUS } from "../../consts";
import { AlertErrorMessage, AlertImageLoading, AlertLoadingMessage } from "../../components/AlertMessage";
import { useAdvancements } from "../../services/useDatas";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { Filter } from "../../components/Filter";
import { useFilterData } from "../../hooks/useFilterData";

export function AdvancementsInformation() {
	const { datas, status } = useAdvancements();
	const { filteredDatas, filter, setFilter } = useFilterData(datas, "title");
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(datas.length);

	return (
		<>
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
			{status === FETCH_STATUS.LOADED && (
				<>
					<div className="flex flex-col items-center justify-center max-w-6xl p-8 mx-auto mc-container mt-7">
						<h1 className="font-bold text-[40px] text-center">Advancements</h1>
						<div className="w-full my-5">
							<Filter data="advancement" value={filter} onChange={setFilter} />
							<div className="flex flex-col overflow-y-scroll h-[512px] my-5 gap-y-10">
								{filteredDatas.map((data) => {
									return (
										<div
											key={data.id}
											className="flex gap-x-1"
											style={{
												display: data.hidden ? "none" : "flex",
											}}
										>
											<div className="flex-1 [&>*]:px-5">
												<h2 className="bg-[#046a95] border-4 border-black text-white rounded-lg text-[32px]">
													{data.title}
												</h2>
												<p
													className={`bg-[#202020] border-4 border-[#555555] rounded-lg text-[24px] ${data.tier === "Challenge" ? "text-purple-600" : "text-green-600"}`}
												>
													{data.description}
												</p>
											</div>
											<a className="cursor-pointer flex flex-col bg-gray-300 text-center border-2 border-black rounded-lg items-center justify-center w-[64] hover:border-white">
												<i className="fa-solid fa-magnifying-glass text-[56px] px-2" />
												<span>See</span>
											</a>
											<a
												className="cursor-pointer flex flex-col bg-gray-300 text-center border-2 border-black rounded-lg items-center justify-center w-[64] hover:border-white"
												onClick={() => {
													const path = `${API_URL}/advancements/${data.id}`;
													navigator.clipboard.writeText(path);
												}}
											>
												<i className="fa-regular fa-copy text-[56px] px-2" />
												<span>GET</span>
											</a>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
