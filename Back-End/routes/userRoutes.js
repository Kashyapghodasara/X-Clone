import userRegister, { Bookmark, follow, getOtherUsers, getProfile, Login, Logout, Unfollow } from "../controllers/userController.js";
import isAuthentication from "../config/auth.js";
import express from "express";

const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/bookmark/:id").put(isAuthentication, Bookmark)
router.route("/profile").get(isAuthentication, getProfile)
router.route("/getOtherUsers").get(isAuthentication, getOtherUsers)
router.route("/follow/:id").get(isAuthentication, follow)
router.route("/unfollow/:id").get(isAuthentication, Unfollow)





export default router