import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: "../config/.env"
});

const DBConnect = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MongoDB Connected Successfully ⚙");
    }).catch((error)=>{
        console.log("Connection Error", error.message);
    })
}

export default DBConnect