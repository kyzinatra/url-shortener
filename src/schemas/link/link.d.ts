import { Schema, Types } from "mongoose";

export interface ILink {
	ref: string;
	link: string;
	visitors: Types.ObjectId[];
	creator: Types.ObjectId;
	createdAt: Date;
}
