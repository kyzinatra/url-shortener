import crypto from "crypto";

export function getRandomString(n: number) {
	return parseInt(crypto.randomBytes(n).toString("hex"), 16).toString(32);
}
