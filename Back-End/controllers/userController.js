import DBConnect from "../config/database.js";
import User from "../models/userSchema.js";
import logger from "../logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

DBConnect();


export const mainRoute = (req, res) => {
    const token = req.cookies.token;
    if (!token) { 
        return res.redirect("/login");
    }
}

const userRegister = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // Basic Validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        }
        // FindUser
        const findUser = await User.findOne({ email, username })
        if (findUser) {
            res.status(401).json({
                message: "User Already Exist",
                success: false
            })
        }
        // Create User
        const hashPassword = await bcrypt.hash(password, 16)
        const user = await User.create({
            name,
            username,
            email,
            password: hashPassword
        })
        res.status(201).json({
            message: "User Registered Successfully ✔",
            success: true
        })

    } catch (error) {
        logger.critical("Error in userRegister", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export default userRegister

export const Login = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Extract password from request body

        if (!username || !email || !password) {  // Add password to validation
            return res.status(401).json({
                message: "All fields are required in Login",
                success: false
            });
        }

        // FindUser
        const findUser = await User.findOne({ email, username });
        if (!findUser) {
            return res.status(401).json({
                message: "User Not Found In LoggedIn Process",
                success: false
            });
        }

        // Compare Password
        const comparePassword = await bcrypt.compare(password, findUser.password);  // Use password here
        if (!comparePassword) {
            return res.status(401).json({
                message: "Password Not Match In LoggedIn Process",
                success: false
            });
        }

        const tokenData = {
            userId: findUser._id
        };

        // Create Token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.cookie("token", token, { expiresIn: "1h", httpOnly: true }).status(200).json({
            message: "User LoggedIn Successfully ✔",
            message: `Welcome ${findUser.name}`,
            findUser,      // You can send whole userInfo to Frontend
            success: true
        });
    } catch (error) {
        logger.critical("Error in Login", error.message);
    }
};


export const Logout = async (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "Logout Successfully",
        success: true
    })
}

export const Bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const tweetId = req.params.id;

        //Find User
        const user = await User.findById(loggedInUserId)

        // Check Bookmark is Present or Not
        if (user.bookmark.includes(tweetId)) {
            // Remove Bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmark: tweetId } })
            return res.status(200).json({
                message: "Bookmark Removed Successfully",
                success: true
            })
        } else {
            // Add Bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmark: tweetId } })
            return res.status(200).json({
                message: "Bookmark Added Successfully",
                success: true
            })
        }

    } catch (error) {
        logger.critical("Error in Bookmark", error.message);
    }
}

export const getProfile = async (req, res) => {
    try {
        const paramsUserId = req.params.id;
        const user = await User.findById(paramsUserId).select("-password")

        /* console.log(user) */
        res.status(200).json({
            user
            // Specially created for Effeciant API Response
            /* message: "Profile Get Successfully",
            success: true,
            Name: user.name,
            Username: user.username,
            Email: user.email,
            Followers: user.followers.length,
            Followings: user.following.length */
        })
    } catch (error) {
        logger.critical("Profile Fetching Error", error.message)
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        if (!allUsers) {
            return res.json({
                message: "NO any User Found",
                success: false
            })
        }
        return res.json({
            message: "User Find Successfully",
            success: true,
            allUsers      // Send allUser to frontend
        })
    } catch (error) {
        logger.critical("Other Users Fetching Error", error.message)
    }
}


export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // KG
        const followerUserId = req.params.id; // KD

        // Find logged-in user and follower user
        const loggedInUser = await User.findById(loggedInUserId);
        const followerUser = await User.findById(followerUserId);

        // Check if the follower user exists
        if (!followerUser) {
            return res.status(401).json({ message: "User Not Found", success: false });
        }

        // Check if already following
        if (!loggedInUser.followers.includes(followerUser._id)) {
            // Update following and followers arrays
            await loggedInUser.updateOne({ $push: { followers: followerUser._id } });
            await followerUser.updateOne({ $push: { following: loggedInUser._id } });

            res.status(200).json({
                message: `${followerUser.name} is now following you (${loggedInUser.name})`,
                success: true
            });
        } else {
            return res.status(401).json({
                message: `${followerUser.name} already followed you`,
                success: false
            });
        }
    } catch (error) {
        logger.critical("Follow Error", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


export const Unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // KG
        const followerUserId = req.params.id // KD

        const logginUser = await User.findById(loggedInUserId)
        const followerUser = await User.findById(followerUserId)

        if (!followerUser) return res.status(401).json({ message: "User Not Found", success: false })

        if (followerUser.following.includes(logginUser._id)) {
            await followerUser.updateOne({ $pull: { following: logginUser._id } });
            await logginUser.updateOne({ $pull: { followers: followerUser._id } });


            res.status(200).json({
                message: `${followerUser.name} is now UnFollowing You (${logginUser.name})`
            })
        }
    } catch (error) {
        logger.critical("Error in Unfollow", error.message)
    }
}