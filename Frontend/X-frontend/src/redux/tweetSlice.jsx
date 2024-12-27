import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
    name: "TWEET",
    initialState: {
        allTweet: null
    },
    reducers: {
        getAllTweet: (state, action) => {
            state.allTweet = action.payload
        }
    }
})

export const {getAllTweet} = tweetSlice.actions;
export default tweetSlice.reducer