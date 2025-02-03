import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/", UserControllers.createUser);

router.get("/", UserControllers.getAllUsers);

export const UserRoutes = router;
