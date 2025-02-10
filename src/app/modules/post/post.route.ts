import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { PostControllers } from "./post.controller";
import { PostValidations } from "./post.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost
);

router.get("/", PostControllers.getAllPosts);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostControllers.getSinglePosts
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostControllers.deletePosts
);

export const PostRoutes = router;
