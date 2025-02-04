import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/", UserControllers.createUser);

router.get("/", UserControllers.getAllUsers);

router.get("/:id", UserControllers.getSingleUser);

router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
