import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tweet from "../models/tweetSchema.js"
import logger from "../logger.js";
import DBConnect from "../config/database.js";

DBConnect();

export const createTweet = async (req, res) => {
    try {
        const {description} = req.body;
        const { userId } = req.user

        if(!description || !userId ){
            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        }

        const tweet = await Tweet.create({
            description,
            userId
        })
        return res.status(201).json({
            message: "Tweet Created Successfully",
            success: true
        })
    } catch (error) {
        logger.critical("Tweet Creation Error", error.messgae)
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const tweet = await Tweet.findByIdAndDelete(tweetId);
        return res.status(200).json({
            message: "Tweet Deleted Successfully",
            success: true
        })
    } catch (error) {
        logger.critical("Tweet Deletion Error", error.messgae)
    }
}

export const like_dislike_Tweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const loggedInUserId = req.user.userId // UserID is came from Middleware
        const tweet = await Tweet.findById(tweetId);

        if(tweet.like.includes(loggedInUserId)) {
            // dislike
            await Tweet.findByIdAndUpdate(tweetId, {$pull: {like: loggedInUserId}})
            return res.status(200).json({
                message: "Tweet DisLike Successfully 💔",
                success: true
            })
        } else {
            // Like
            await Tweet.findByIdAndUpdate(tweetId, {$push: {like: loggedInUserId}})
            return res.status(200).json({
                message: "Tweet Like Successfully 🧡",
                success: true
            })
        }
    } catch (error) {
        logger.critical("Tweet Like-Dislike Error", error.messgae)
    }
}

