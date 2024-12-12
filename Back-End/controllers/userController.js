import DBConnect from "../config/database.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

DBConnect();


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
        console.log("Error in userRegister", error.message);
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
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "4d" });

        return res.cookie("token", token, { httpOnly: true }).status(200).json({
            message: "User LoggedIn Successfully ✔",
            message: `Welcome ${findUser.name}`,
            success: true
        });
    } catch (error) {
        console.log("Error in Login", error.message);
    }
};


export const Logout = async (req, res) => {
    return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
        message: "Logout Successfully",
        success: true
    })
}