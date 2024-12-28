import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
    name: "TWEET",
    initialState: {
        allTweet: null,
        refresh: false
    },
    reducers: {
        getAllTweet: (state, action) => {
            state.allTweet = action.payload
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh
        }
    }
})

export const {getAllTweet, getRefresh} = tweetSlice.actions;
export default tweetSlice.reducer