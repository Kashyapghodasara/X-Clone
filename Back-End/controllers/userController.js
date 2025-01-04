import DBConnect from "../config/database.js";
import User from "../models/userSchema.js";
import logger from "../logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

DBConnect();


export const updateProfile = async (req, res) => {

    try {
        const { fullname, birthdate, location, bio } = req.body;
        const loggedInUserId = req.params.id;
        if (!fullname && !birthdate && !location && !bio) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        }
        const findUser = await User.findById(loggedInUserId)
        if (!findUser) return res.status(404).json({ message: "User not found", success: false })

        await User.findByIdAndUpdate(loggedInUserId, { $set : {
            name: fullname,
            birthdate,
            location,
            description: bio
        }})
        return res.status(200).json({
            message: "Profile Updated Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        logger.error("Error occure in Update Profile", error.message)
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
        res.status(200).json({ user })
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
        const loggedInUserId = req.user._id; // User who is logged in
        const followedUserId = req.params.id; // User to be followed

        // Find the logged-in user and the user to be followed
        const loggedInUser = await User.findById(loggedInUserId);
        const followedUser = await User.findById(followedUserId);

        // Check if the followed user exists
        if (!followedUser) {
            return res.status(404).json({ message: "User Not Found", success: false });
        }

        // Check if the logged-in user is already following the followed user
        if (loggedInUser.following.includes(followedUser._id)) {
            return res.status(400).json({
                message: `You are already following ${followedUser.name}.`,
                success: false
            });
        }

        // Update following and followers arrays
        await loggedInUser.updateOne({ $push: { following: followedUser._id } });
        await followedUser.updateOne({ $push: { followers: loggedInUser._id } });

        return res.status(200).json({
            message: `You are now following ${followedUser.name}.`,
            success: true
        });

    } catch (error) {
        logger.critical("Follow Error", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


export const Unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // User who is logged in
        const followedUserId = req.params.id; // User to be unfollowed

        // Find the logged-in user and the followed user
        const loggedInUser = await User.findById(loggedInUserId);
        const followedUser = await User.findById(followedUserId);

        // Check if the followed user exists
        if (!followedUser) {
            return res.status(404).json({ message: "User Not Found", success: false });
        }

        // Check if the logged-in user is actually following the followed user
        if (!loggedInUser.following.includes(followedUser._id)) {
            return res.status(400).json({
                message: `You are not following ${followedUser.name}.`,
                success: false
            });
        }

        // Update following and followers arrays
        await loggedInUser.updateOne({ $pull: { following: followedUser._id } });
        await followedUser.updateOne({ $pull: { followers: loggedInUser._id } });

        return res.status(200).json({
            message: `You have unfollowed ${followedUser.name}.`,
            success: true
        });

    } catch (error) {
        logger.critical("Unfollow Error", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
