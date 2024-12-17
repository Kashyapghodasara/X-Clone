import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../logger.js";
dotenv.config();

const DBConnect = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        logger.info("MongoDB Connected Successfully ⚙");
    }).catch((error)=>{
        logger.critical("Connection Error", error.message);
    })
}

export default DBConnect