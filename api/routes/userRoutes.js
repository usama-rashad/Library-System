import express from "express";
import { verifyUser_MW } from "./../middleware/auth/verifyUser.js";
import bcrypt from "bcrypt";

// Middleware
import { basicAuth_MW } from "../middleware/auth/verifyUser.js";

// Controllers
import { signupController, loginController, logoutController, loginSystemStatusController, deleteUserController, loginCreateAccessToken } from "../controllers/userController.js";

const router = express.Router();

const signupRoute = router.put("/signup", signupController);

const deleteUserRoute = router.put("/delete", deleteUserController);

const logoutRoute = router.put("/logout", logoutController);

const loginRoute = router.put("/login", loginController);

const loginSystemStatusRoute = router.get("/status", loginSystemStatusController);

const loginCreateAccessTokenRoute = router.get("/createNewAccessToken", loginCreateAccessToken);

export { loginRoute, logoutRoute, signupRoute, deleteUserRoute, loginSystemStatusRoute, loginCreateAccessTokenRoute };
