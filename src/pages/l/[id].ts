import type { APIRoute } from "astro";
import { Link } from "../../schemas/link/link.schema";
import { Client } from "../../schemas/client/client.schema";

export const GET: APIRoute = async ({ redirect, params: { id }, clientAddress, request }) => {
	if (!id) return redirect("/", 307);
	const link = await Link.findOne({ ref: id }).catch(() => null);
	if (!link) return redirect("/", 307);

	const client = await Client.create({
		ip: clientAddress,
		userAgent: request.headers.get("user-agent"),
	});

	link.visitors.push(client._id);
	await link.save();

	return redirect(link.link, 307);
};
