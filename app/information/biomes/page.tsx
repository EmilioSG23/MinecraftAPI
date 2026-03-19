"use client";

import { Layout } from "@/layout/Layout";
import { BiomesInformation } from "@/views/InfoSections/BiomesInformation";
import { Suspense } from "react";

export default function BiomesPage() {
	return (
		<Layout>
			<Suspense>
				<BiomesInformation />
			</Suspense>
		</Layout>
	);
}
