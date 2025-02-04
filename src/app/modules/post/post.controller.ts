import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Post is created succesfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Posts data retrived succesfully",
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
};
