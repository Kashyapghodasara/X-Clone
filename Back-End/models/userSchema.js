import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: "Your Bio...😎🙂"
    },
    location: {
        type: String,
        default: "India"
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    bookmark: {
        type: Array,
        default: []
    },
    profilePic: {
        type: String,
        default: "/images/default.jpg" // Updated to include the full path
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;