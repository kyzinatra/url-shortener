import type { AstroIntegration } from "astro";
import { getDB } from "../db";

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
