import express from "express";
import { verifyUser_MW } from "./../middleware/auth/verifyUser.js";
import bcrypt from "bcrypt";

// Middleware
import { basicAuth_MW } from "../middleware/auth/verifyUser.js";

// Controllers
import {
  signupController,
  loginController,
  checkLoginController,
  logoutController,
  loginSystemStatusController,
  deleteUserController,
  loginCreateAccessTokenController,
} from "../controllers/userController.js";

const router = express.Router();

const signupRoute = router.put("/signup", signupController);

const deleteUserRoute = router.put("/delete", deleteUserController);

const logoutRoute = router.post("/logout", logoutController);

const loginRoute = router.post("/login", loginController);

const checkLoginRoute = router.post("/checkLogin", checkLoginController);

const loginSystemStatusRoute = router.get("/status", loginSystemStatusController);

const loginCreateAccessTokenRoute = router.get("/createNewAccessToken", loginCreateAccessTokenController);

export { loginRoute, checkLoginRoute, logoutRoute, signupRoute, deleteUserRoute, loginSystemStatusRoute, loginCreateAccessTokenRoute };
