import SwaggerEmbed from "../components/SwaggerEmbed";
import { API_URL } from "../consts";
import { useChangeSection } from "../hooks/useSection";

function Code({ code }) {
	return (
		<code className="flex items-center justify-center p-2 text-white text-[10px] sm:text-[12px] bg-black border-2 border-purple-700 gap-x-2 rounded-xl">
			<p className="overflow-x-auto">{code}</p>
			<button
				type="button"
				className="flex flex-col items-center justify-center p-1 text-center border-2 border-black rounded-lg bg-white/25 hover:bg-white/50 cursor-pointer"
				onClick={() => {
					navigator.clipboard.writeText(code);
				}}
			>
				<i className="fa-regular fa-copy text-[14px] sm:text-[20px]" />
			</button>
			<a
				href={code}
				target="_blank"
				className="flex flex-col items-center justify-center p-1 text-center border-2 border-black rounded-lg bg-white/25 hover:bg-white/50 cursor-pointer"
			>
				<i className="fa-regular fa-eye text-[14px] sm:text-[20px]" />
			</a>
		</code>
	);
}

export function Documentation() {
	useChangeSection("documentation");
	return (
		<section className="mc-container h-[85vh] mx-auto max-w-7xl mt-10 flex flex-col p-2 sm:p-10 text-justify">
			<h1 className="font-bold text-[20px] sm:text-[32px] text-center p-2">
				💎⛏️ Minecraft API - Documentation 💎⛏️
			</h1>
			<div className="overflow-x-hidden overflow-y-scroll px-2">
				<header className="flex flex-col items-center justify-center">
					<p className="text-[14px] sm:text-[20px]">
						Welcome to the <b>Minecraft API</b> documentation. Here you will find all the
						information you need to use our API and application.This API only make GET actions
						because we only give information about Minecraft datas. You can access to the API using
						the next <b>endpoint</b>.
					</p>
					<Code code={`${window.location.origin + API_URL}/`} />
				</header>
				<section className="text-[14px] sm:text-[20px]">
					<h2 className="font-bold text-[24px] mt-5 underline">⚒ Introduction</h2>
					<p>
						The Minecraft API allows you to access various data types related to the game, such as
						advancements, biomes, blocks, items, mobs, and structures. There are two components:
						This that show all information of the game where you can access to this with the
						information section or with the terminal, and the API which you can use into your
						projects. If you have problems to understand the API documentation from here, you can
						access to the Swagger Doc{" "}
						<a className="text-blue-600 hover:underline" href={`${API_URL}-docs`}>
							here
						</a>
						.
					</p>
				</section>
				<section className="text-[14px] sm:text-[20px]">
					<h2 className="font-bold text-[24px] mt-5 underline">💎 API Routes</h2>
					<p>Here are the available API routes:</p>
					<ul className="">
						{["advancements", "biomes", "blocks", "items", "mobs", "structures"].map((entity) => {
							return (
								<li key={entity}>
									<a
										href={`${API_URL}/${entity}`}
										className="font-bold bg-black/15 rounded p-1 cursor-pointer"
									>
										/api/{entity}
									</a>{" "}
									Get information about {entity}
								</li>
							);
						})}
					</ul>
					<p className="mt-5">
						Also, for each API controller, you can access to the next endpoints:
					</p>
					<ul className="">
						{[
							{ endpoint: "/", description: "Access to all the information of a entity" },
							{ endpoint: "/count", description: "Give the amount of datas present in a entity" },
							{ endpoint: "/keys", description: "Obtain the keys availables of a entity" },
							{ endpoint: "/:id", description: "Get the information of a entity by Id" },
							{ endpoint: "/:id/image", description: "Get the image of a entity" },
							{ endpoint: "/all/:key", description: "Show all datas only with a key" },
							{
								endpoint: "/all/:key/:value",
								description: "Filter datas by a key and value",
							},
							{ endpoint: "/:id/:key", description: "Show the value of the key of a data" },
						].map((entity) => {
							return (
								<li key={entity}>
									<span href={`${API_URL}/${entity}`} className="font-bold bg-black/15 rounded p-1">
										{entity.endpoint}
									</span>{" "}
									{entity.description}
								</li>
							);
						})}
					</ul>
				</section>

				<section className="text-[14px] sm:text-[20px]">
					<h2 className="font-bold text-[24px] mt-5 underline">⚔️ Examples of Use</h2>
					<p>
						You can test the Minecraft API using the Swagger Documentation{" "}
						<a className="text-blue-600 hover:underline" href={`${API_URL}-docs`}>
							here
						</a>
						.
					</p>
					<div className="hidden xs:block">
						<p>Or try below:</p>
						<SwaggerEmbed />
					</div>
				</section>

				<section className="text-[14px] sm:text-[20px]">
					<h2 className="font-bold text-[24px] mt-5 underline">⛏ Issues</h2>
					<p>
						If you found some bugs with the application and the API, you can open a Issue in the{" "}
						<a
							className="text-blue-600 hover:underline"
							href="https://github.com/EmilioSG23/MinecraftAPI/issues/new"
							target="_blank"
						>
							GitHub repository
						</a>
						.
					</p>
				</section>

				<section className="text-[14px] sm:text-[20px]">
					<h2 className="font-bold text-[24px] mt-5 underline">👷 Community</h2>
					<p>
						Because the application manages <b>large amounts</b> of data and variables of the
						entities present in Minecraft, many of the data presented in the application{" "}
						<b>are not correct</b>. Therefore, I encourage them to collaborate with the correction
						of data, especially corrected data of the blocks and items, add more information to each
						entity. For example, for the blocks and items it is necessary to fill the information
						with crafts, and in other entities there are empty fields that need to be filled. Also,
						it is necessary to add the data of the new versions of Minecraft. So far there is data
						until 1.19. Preferably, the information present in{" "}
						<a
							className="text-blue-600 hover:underline"
							href="https://minecraft.wiki/"
							target="_blank"
						>
							Minecraft Wiki
						</a>{" "}
						must be taken as a basis. If you want to collaborate with the development of the
						application, visit the{" "}
						<a
							className="text-blue-600 hover:underline"
							href="https://github.com/EmilioSG23/MinecraftAPI"
							target="_blank"
						>
							GitHub repository
						</a>
						, you can create a new branch with git, develop your contribution and upload the PR like
						an Issue. The <b>objective</b> of this application is that it is a more accessible
						information base for the community and developers. Likewise, any code improvement
						contribution will be welcome.
					</p>
				</section>

				<section className="text-[14px] sm:text-[20px]">
					<h2 className="font-bold text-[24px] mt-5 underline">🏹 Special Thanks</h2>
					<ul className="list-disc list-inside">
						<li>
							<b>Minecraft Wiki:</b> Some of the assets provides by the API has been obtained from
							the{" "}
							<a
								className="text-blue-600 hover:underline"
								href="https://minecraft.wiki/"
								target="_blank"
							>
								Minecraft Wiki
							</a>
						</li>
						<li>
							<b>anish-shanbhag:</b> Some values and assets of the datas provides by the API has
							been obtained from the Minecraft API by anish-shanbhag. You can check the link for the
							API, clicking{" "}
							<a
								href="https://anish-shanbhag.stoplight.io/docs/minecraft-api/8e768e6831f6c-the-minecraft-api"
								target="_blank"
								className="text-blue-600 hover:underline"
							>
								{" "}
								here!
							</a>{" "}
							<br />
							And you can check the GitHub repository!:{" "}
							<a
								href="https://github.com/anish-shanbhag/minecraft-api"
								target="_blank"
								className="text-blue-600 hover:underline"
							>
								https://github.com/anish-shanbhag/minecraft-api
							</a>
						</li>
					</ul>
				</section>
			</div>
		</section>
	);
}
