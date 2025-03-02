import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import logger from "../logger.js"
import User from "../models/userSchema.js"
dotenv.config({
    path: "../config/.env"
})

// Same as Middleware (Protected Routes)
const isAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "Please Login First",
                success: false
            });
            return res.redirect("/login"); // This ensures the redirect happens after the JSON response.
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)     /* console.log(decoded) // It will give "userId" */
      
        const userData = await User.findById(decoded.userId)
        if (!userData) {
             res.status(401).json({
                message: "User Not Found",
                success: false
            })
            return res.redirect("/login")
            
        }
        req.user = userData
        next();
    } catch (error) {
        logger.critical(error.message)
    }
}

export default isAuthentication
/*  Reusability: User details are available across all protected routes without re-verifying the token.
 Convenience: Accessing user data from req.user simplifies code in route handlers. */