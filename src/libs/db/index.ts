import mongoose from "mongoose";
import { config } from "dotenv";

declare global {
	var _mongoConnection: typeof mongoose;
}

var cachedMongo: typeof mongoose;

async function connectToDB() {
	const host = process.env.MONGODB_HOST;
	const port = process.env.MONGODB_PORT;
	const username = process.env.MONGODB_USERNAME;
	const pass = process.env.MONGODB_PASSWORD;
	const dbname = process.env.MONGODB_DBNAME;

	if (![host, port, username, pass, dbname].every(Boolean)) {
		throw new Error("Invalid mongo env vars");
	}

	console.time("getDB");
	const ret = await mongoose.connect(`mongodb://${username}:${pass}@${host}:${port}/${dbname}`, {
		authSource: "admin",
		directConnection: true,
	});
	console.timeEnd("getDB");

	return ret;
}

export async function getDB() {
	if (global._mongoConnection) return cachedMongo;

	config();
	global._mongoConnection = await connectToDB();
	cachedMongo = global._mongoConnection;
	return cachedMongo;
}
