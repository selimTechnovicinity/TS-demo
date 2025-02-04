import { Types } from "mongoose";

export type TPost = {
  title: string;
  content: string;
  authorId: Types.ObjectId;
};
