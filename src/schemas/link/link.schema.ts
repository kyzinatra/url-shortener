import mongoose, { Schema } from "mongoose";
import type { ILink } from "./link";

const linkSchema = new mongoose.Schema<ILink>({
	ref: {
		unique: true,
		required: true,
		type: String,
	},
	link: { required: true, type: String },
	visitors: [{ ref: "client", type: Schema.Types.ObjectId }],
	creator: { ref: "client", type: Schema.Types.ObjectId },
	createdAt: { type: Date, expires: 60 * 60 * 24 * 365, default: Date.now }, // Ссылка живет год
});

export const Link = mongoose.model<ILink>("link", linkSchema);
