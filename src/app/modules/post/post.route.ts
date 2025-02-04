import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.post("/", PostControllers.createPost);

router.get("/", PostControllers.getAllPosts);

router.get("/:id", PostControllers.getSinglePosts);

router.delete("/:id", PostControllers.deletePosts);

export const PostRoutes = router;
