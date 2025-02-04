import AppError from "../../error/AppError";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await Post.find();
  if (!result) {
    throw new AppError(404, "Post data not found.");
  }
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id);

  if (!result) {
    throw new AppError(404, "Post data not found.");
  }
  return result;
};

const deletePostFromDB = async (id: string) => {
  await getSinglePostFromDB(id);
  const result = await Post.findByIdAndDelete(id);
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  deletePostFromDB,
};
