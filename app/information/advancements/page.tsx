"use client";

import { Layout } from "@/layout/Layout";
import { AdvancementsInformation } from "@/views/InfoSections/AdvancementsInformation";
import { Suspense } from "react";

export default function AdvancementsPage() {
	return (
		<Layout>
			<Suspense>
				<AdvancementsInformation />
			</Suspense>
		</Layout>
	);
}
