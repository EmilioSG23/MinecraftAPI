"use client";

/** Grid of entity shortcuts displayed on the information hub route. */
import { Container } from "@/shared/components/Container";
import { DATAS_TYPE } from "@/utils/consts";
import Image from "next/image";
import Link from "next/link";

interface InfoHomeCardProps {
	id: string;
}

/**
 * Displays a single information hub card that links to an entity section.
 *
 * @param props.id Entity identifier used for the route and preview image.
 * @returns Clickable entity shortcut card.
 */
function InfoHomeCard({ id }: InfoHomeCardProps) {
	return (
		<Link
			href={`/information/${id}`}
			className="flex items-center p-1 bg-green-500 border-green-900 rounded-lg gap-x-5 border-3 hover:bg-green-400 hover:border-green-700"
		>
			<div className="mx-2">
				<Image
					src={`/information/${id}.png`}
					className="info-card size-12 sm:size-18 lg:size-20 object-contain"
					width={80}
					height={80}
					alt={id}
					style={{ objectFit: "contain", imageRendering: "pixelated" }}
				/>
			</div>
			<div className="text-left">
				<h2 className="uppercase text-white text-[20px] sm:text-[30px] lg:text-[40px] font-bold">
					{id}
				</h2>
				<span className="italic text-[12px] sm:text-[16px] lg:text-[20px] text-gray-700">
					Click to see information about all the {id}
				</span>
			</div>
		</Link>
	);
}

/**
 * Renders the full set of information shortcuts for each supported entity type.
 *
 * @returns Container with all information section cards.
 */
export function InformationHome() {
	return (
		<Container>
			<h1 className="text-red-700 text-[20px] sm:text-[24px] lg:text-[32px] font-bold text-center">
				Choose a section for information
			</h1>
			<article className="flex flex-col mt-2 sm:mt-5 gap-y-2">
				{Object.values(DATAS_TYPE).map((dataType) => (
					<InfoHomeCard key={dataType} id={dataType} />
				))}
			</article>
		</Container>
	);
}

