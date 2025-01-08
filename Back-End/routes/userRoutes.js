import userRegister, { Bookmark, follow, getBookmarkTweet, getOtherUsers, getProfile, Login, Logout, Unfollow, updateProfile } from "../controllers/userController.js";
import isAuthentication from "../config/auth.js";
import express from "express";

const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/bookmark/:id").put(isAuthentication, Bookmark)
router.route("/profile/:id").get(isAuthentication, getProfile)
router.route("/getOtherUsers").get(isAuthentication, getOtherUsers)
router.route("/follow/:id").post(isAuthentication, follow)
router.route("/unfollow/:id").post(isAuthentication, Unfollow)
router.route("/updateProfile/:id").post(isAuthentication, updateProfile)
router.route("/getBookmark").get(isAuthentication, getBookmarkTweet)


// Create Update value route





export default router