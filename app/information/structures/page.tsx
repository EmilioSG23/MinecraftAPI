"use client";

import { Layout } from "@/layout/Layout";
import { StructuresInformation } from "@/views/InfoSections/StructuresInformation";
import { Suspense } from "react";

export default function StructuresPage() {
	return (
		<Layout>
			<Suspense>
				<StructuresInformation />
			</Suspense>
		</Layout>
	);
}
