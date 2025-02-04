import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await Post.find();

  return result;
};


export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
};
