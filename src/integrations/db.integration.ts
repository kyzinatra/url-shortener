import type { AstroIntegration } from "astro";
import { getDB } from "../libs/db";

export default function mongoose(): AstroIntegration {
	return {
		name: "mongoose-connect",
		hooks: {
			"astro:server:setup": () => {
				getDB();
			},
		},
	};
}
