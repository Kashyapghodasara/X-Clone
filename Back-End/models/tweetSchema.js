import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userDetails: {
        type: Array,
        default: []
    },
}, { timestamps: true })

// Tweet has no relation with Bookmark. instead of User has direct relation with Bookmark.

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;