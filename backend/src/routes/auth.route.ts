import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);


//Secured endpoints
authRouter.route("/logout").post(verifyJWT, logoutUser);
authRouter.route("/refresh-token").post(verifyJWT, refreshToken);
