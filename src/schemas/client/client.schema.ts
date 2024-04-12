import mongoose from "mongoose";
import type { IClient } from "./client";

const linkSchema = new mongoose.Schema<IClient>({
	ip: {
		type: String,
		default: "",
	},
	userAgent: {
		type: String,
		default: "",
	},
	createdAt: { type: Date, expires: 60 * 60 * 24 * 365, default: Date.now }, //  Живет год
});

export const Client = mongoose.model<IClient>("client", linkSchema);
