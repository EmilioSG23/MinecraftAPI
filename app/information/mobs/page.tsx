"use client";

import { Layout } from "@/layout/Layout";
import { MobsInformation } from "@/views/InfoSections/MobsInformation";
import { Suspense } from "react";

export default function MobsPage() {
	return (
		<Layout>
			<Suspense>
				<MobsInformation />
			</Suspense>
		</Layout>
	);
}
