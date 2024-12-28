import Tweet from "../models/tweetSchema.js"
import User from "../models/userSchema.js"
import logger from "../logger.js";
import DBConnect from "../config/database.js";

DBConnect();

export const createTweet = async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.body

        if (!description || !id) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        }
        const user = await User.findById(id).select("-password")
        const tweet = await Tweet.create({
            description,
            userId: id,
            userDetails: user
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
        const loggedInUserId = req.user._id // UserID is came from Middleware
        const tweet = await Tweet.findById(tweetId);

        if (tweet.like.includes(loggedInUserId)) {
            // dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } })
            return res.status(200).json({
                message: "Tweet DisLike Successfully 💔",
                success: true
            })
        } else {
            // Like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } })
            return res.status(200).json({
                message: "Tweet Like Successfully 🧡",
                success: true
            })
        }
    } catch (error) {
        logger.critical("Tweet Like-Dislike Error", error.messgae)
    }
}

export const getAllTweet = async (req, res) => {
    try {
        const allTweet = await Tweet.find(); // All tweet return in Array
        if (allTweet.length === 0) {
            return res.status(401).json({
                message: "Tweet Not Found",
                success: false
            });
        }
        res.status(200).json({
            message: "Tweet Fetched Successfully",
            success: true,
            Tweet: allTweet
        })
        /*  console.log(allTweet) */
    } catch (error) {
        logger.critical("Tweet Fetching Error", error.messgae)
        res.status(401).json({
            message: "Tweet Fetching Error",
            success: false
        })
    }
}

export const getFollowingTweet = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const loggedInUserFollowing = req.user.following;

        const followingTweet = await Tweet.find({
            userId: { $in: loggedInUserFollowing }
        });

        // You might want to return or process `followingTweet` here
        res.status(200).json({
            message: "Following tweets fetched successfully",
            success: true,
            data: followingTweet
        });

    } catch (error) {
        logger.critical("Tweet Fetching Error", error.message);
        res.status(401).json({
            message: "Following Tweet Fetching Error",
            success: false
        });
    }
}
