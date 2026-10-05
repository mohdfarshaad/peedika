import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);

//Secured endpoints
authRouter.route("/me").get(verifyJWT, getMe);
authRouter.route("/logout").post(verifyJWT, logoutUser);
authRouter.route("/refresh-token").post(verifyJWT, refreshToken);
