import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import logger from "../logger.js"
dotenv.config({
    path: "../config/.env"
})

// Same as Middleware (Protected Routes)
const isAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please Login First",
                success: false
            })
        }

        /* This is typically an object containing the claims that were encoded
         in the token (e.g., user ID, email, roles, etc.). */
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded)
        
        req.user = decoded
       /*  Reusability: User details are available across all protected routes without re-verifying the token.
        Convenience: Accessing user data from req.user simplifies code in route handlers. */
        
        next();
    } catch (error) {
        logger.critical(error.message)
    }
}

export default isAuthentication