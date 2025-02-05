import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/", UserControllers.createUser);

router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getAllUsers
);

router.get(
  "/:id",
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getSingleUser
);

router.delete(
  "/:id",
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.deleteUser
);

export const UserRoutes = router;
