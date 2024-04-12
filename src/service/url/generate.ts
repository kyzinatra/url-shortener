import type { AstroGlobal } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { Client } from "../../schemas/client/client.schema";
import { Link } from "../../schemas/link/link.schema";
import { getRandomString } from "../../utils/get-random-string";

type TAstro = Readonly<
	AstroGlobal<Record<string, any>, AstroComponentFactory, Record<string, string | undefined>>
>;

async function getNewRef() {
	const newRef = getRandomString(6);
	const bdLink = await Link.find({ ref: newRef }).catch(() => null);
	if (!bdLink || !bdLink.length) return newRef;

	return getNewRef();
}

export async function generateShortURL(url: string, Astro: TAstro): Promise<string> {
	const parsedURL = new URL(url);

	const clients = await Client.find({
		ip: Astro.clientAddress,
		createdAt: {
			$gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
		},
	}).limit(70);

	if (clients.length >= 69)
		throw new Error("The generation limit has been reached. No more than 70 in 24 hours.");

	if (parsedURL.protocol === "http:") parsedURL.protocol = "https:";

	const ref = await getNewRef();

	const newCreator = await Client.create({
		ip: Astro.clientAddress,
		userAgent: Astro.request.headers.get("user-agent"),
	});
	await Link.create({
		ref,
		link: parsedURL.toString(),
		visitors: [],
		creator: newCreator._id,
	});

	return ref;
}
