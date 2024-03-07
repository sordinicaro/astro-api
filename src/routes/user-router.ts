import { Router } from "express";
import UserController from "../controller/user-controller";


const userRouter = Router();

// GET
userRouter.get("/", UserController.getAllUsers);

userRouter.get("/:id", UserController.getUserById);

// POST
userRouter.post('/', UserController.createUser);

// PATCH
userRouter.patch('/:id', UserController.updateUser);

// DELETE
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;