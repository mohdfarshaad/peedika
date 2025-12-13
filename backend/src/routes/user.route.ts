import { Router } from "express";

export const userRouter = Router();

//User only routes
userRouter.route("/change-password").post();
userRouter.route("/change-email").post();

// Admin Only routes
userRouter.route("/:id").get();
userRouter.route("/").get();
userRouter.route("/:id").delete();
