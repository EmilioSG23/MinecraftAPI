// SwaggerEmbed.tsx
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { API_URL } from "../consts";

export default function SwaggerEmbed() {
	return (
		<div className="w-full max-h-[512px] overflow-auto bg-white/50 border">
			<SwaggerUI url={`${API_URL}-docs-json`} />
		</div>
	);
}
