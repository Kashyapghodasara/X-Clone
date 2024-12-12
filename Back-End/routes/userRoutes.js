import userRegister, { Login, Logout } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(Login)
router.route("/logout").get(Logout)



export default router