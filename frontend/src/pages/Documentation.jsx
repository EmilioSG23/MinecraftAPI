import { API_URL } from "../consts";
import { useChangeSection } from "../hooks/useSection";

function Code({ code }) {
	return (
		<code className="flex items-center justify-center p-2 text-white text-[12px] bg-black border-2 border-purple-700 gap-x-2 rounded-xl">
			{code}
			<a
				className="flex flex-col items-center justify-center p-1 text-center border-2 border-black rounded-lg bg-white/25"
				onClick={() => {
					const path = `${API_URL}`;
					navigator.clipboard.writeText(path);
				}}
			>
				<i className="fa-regular fa-copy text-[20px]" />
			</a>
		</code>
	);
}

export function Documentation() {
	useChangeSection("documentation");
	return (
		<section className="mc-container h-[85vh] mx-auto max-w-7xl mt-10 flex flex-col p-10 text-justify">
			<h1 className="font-bold text-[32px] text-center">Documentation</h1>
			<div className="overflow-x-hidden overflow-y-scroll">
				<header className="flex flex-col items-center justify-center">
					<p className="text-[20px]">
						Welcome to the <b>Minecraft API</b> documentation. Here you will find all the information you need to
						use our API and application.This API only make GET actions because we only give information about
						Minecraft datas. You can access to the API using the next <b>endpoint</b>.
					</p>
					<Code code={`${API_URL}/`} />
				</header>
				<section className="text-[20px]">
					<h2 className="font-bold text-[24px] mt-5">Introduction</h2>
					<p>
						The Minecraft API allows you to access various data types related to the game, such as advancements,
						biomes, blocks, items, mobs, and structures. There are two components: This that show all information
						of the game where you can access to this with the information section or with the terminal, and the
						API which you can use into your projects.
					</p>
				</section>
				<section className="text-[20px]">
					<h2 className="font-bold text-[24px] mt-5">API Routes</h2>
					<p>Here are the available API routes:</p>
					<ul className="list-disc list-inside">
						<li>
							<Code code={`${API_URL}/advancements`} />: Get information about advancements
						</li>
						<li>
							<code>/api/biomes</code>: Get information about biomes
						</li>
						<li>
							<code>/api/blocks</code>: Get information about blocks
						</li>
						<li>
							<code>/api/items</code>: Get information about items
						</li>
						<li>
							<code>/api/mobs</code>: Get information about mobs
						</li>
						<li>
							<code>/api/structures</code>: Get information about structures
						</li>
					</ul>
				</section>

				<h2 className="font-bold text-[24px] mt-5">Examples of Use</h2>
				<p>Here are some examples of how to use the API and commands:</p>
				<pre className="p-2 text-white bg-gray-800 rounded">
					<code># Get</code>
				</pre>

				<h2 className="font-bold text-[24px] mt-5">Contact</h2>
				<p>
					If you have any questions or need support, please contact us at{" "}
					<a href="mailto:support@example.com">support@example.com</a>.
				</p>
			</div>
		</section>
	);
}
