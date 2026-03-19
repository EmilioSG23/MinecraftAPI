"use client";

import { Layout } from "@/layout/Layout";
import { ItemsInformation } from "@/views/InfoSections/ItemsInformation";
import { Suspense } from "react";

export default function ItemsPage() {
	return (
		<Layout>
			<Suspense>
				<ItemsInformation />
			</Suspense>
		</Layout>
	);
}
