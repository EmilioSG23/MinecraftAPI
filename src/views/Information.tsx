import { useChangeSection } from "@/hooks/useSection";
import { InformationHome } from "@/views/InformationHome";

export function Information() {
	useChangeSection("information");

	return (
		<section>
			<InformationHome />
		</section>
	);
}
