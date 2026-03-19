import { API_URL } from "@/consts";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerEmbed() {
	return (
		<div className="w-full max-h-128 overflow-auto bg-white/50 border">
			<SwaggerUI url={`${API_URL}-docs-json`} />
		</div>
	);
}
