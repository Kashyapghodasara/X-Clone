import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
    name: "TWEET",
    initialState: {
        allTweet: null,
        refresh: false,
        isActive: true
    },
    reducers: {
        getAllTweet: (state, action) => {
            state.allTweet = action.payload
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh
        },
        getIsActive: (state, action) => {
            state.isActive = action.payload
        }
    }
})

export const {getAllTweet, getRefresh, getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer