import type { AstroGlobal } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { Client } from "../../schemas/client/client.schema";
import { Link } from "../../schemas/link/link.schema";
import { getRandomString } from "../../utils/get-random-string";
import { getDB } from "../../libs/db";

type TAstro = Readonly<
	AstroGlobal<Record<string, any>, AstroComponentFactory, Record<string, string | undefined>>
>;

async function getNewRef() {
	const newRef = getRandomString(6);
	const bdLink = await Link.find({ ref: newRef }).catch(() => null);
	if (!bdLink || !bdLink.length) return newRef;

	return getNewRef();
}

export async function generateShortURL(url: any, Astro: TAstro): Promise<string> {
	// check string
	if (!url || typeof url !== "string") throw new Error("invalid URL");
	await getDB();

	const parsedURL = new URL(url);

	const clients = await Client.find({
		ip: Astro.clientAddress,
		createdAt: {
			$gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
		},
	}).limit(70);

	if (clients.length >= 69)
		throw new Error("The generation limit has been reached. No more than 70 in 24 hours.");

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
