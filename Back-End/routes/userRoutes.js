import userRegister, { Bookmark, Login, Logout } from "../controllers/userController.js";
import isAuthentication from "../config/auth.js";
import express from "express";

const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/bookmark/:id").put(isAuthentication, Bookmark)




export default router