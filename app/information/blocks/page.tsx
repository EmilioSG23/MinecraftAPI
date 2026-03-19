"use client";

import { Layout } from "@/layout/Layout";
import { BlocksInformation } from "@/views/InfoSections/BlocksInformation";
import { Suspense } from "react";

export default function BlocksPage() {
	return (
		<Layout>
			<Suspense>
				<BlocksInformation />
			</Suspense>
		</Layout>
	);
}
