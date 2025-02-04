import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
