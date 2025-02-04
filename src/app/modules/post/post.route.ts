import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.post("/", PostControllers.createPost);
router.get("/", PostControllers.getAllPosts);

export const PostRoutes = router;
