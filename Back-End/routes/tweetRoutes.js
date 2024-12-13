import express from "express";
import {createTweet, deleteTweet, like_dislike_Tweet} from "../controllers/tweetController.js";
import isAuthentication from "../config/auth.js";
const router = express.Router();

router.route("/create").post(isAuthentication, createTweet)
router.route("/delete/:id").delete(isAuthentication, deleteTweet)
router.route("/like-dislike/:id").put(isAuthentication, like_dislike_Tweet)



export default router