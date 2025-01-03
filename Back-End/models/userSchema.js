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
    description: {
        type: String,
        default: "Your Bio..."
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
}, { timestamps: true })

// Tweet has no relation with Bookmark. instead of User has direct relation with Bookmark.


const User = mongoose.model("User", userSchema);
export default User;