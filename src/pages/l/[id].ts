import type { APIRoute } from "astro";
import { Link } from "../../schemas/link/link.schema";
import { Client } from "../../schemas/client/client.schema";
import { getDB } from "../../libs/db";

export const GET: APIRoute = async ({ redirect, params: { id }, clientAddress, request }) => {
	await getDB();
	if (!id) return redirect("/", 302);
	const link = await Link.findOne({ ref: id }).catch(() => null);
	if (!link) return redirect("/", 302);

	(async () => {
		const client = await Client.create({
			ip: clientAddress,
			userAgent: request.headers.get("user-agent"),
		});

		link.visitors.push(client._id);
		await link.save();
	})().catch(() => null);

	return new Response(null, {
		status: 302,
		headers: {
			"Strict-Transport-Security": "max-age=3600; includeSubDomains",
			Location: link.link,
		},
	});
};
