/** Root information view rendered by the /information route. */
import { useChangeSection } from "@/hooks/useSection";
import { InformationHome } from "@/views/InformationHome";

/**
 * Marks the information section as active and renders the entity hub.
 *
 * @returns Information home content.
 */
export function Information() {
	useChangeSection("information");

	return (
		<section>
			<InformationHome />
		</section>
	);
}
