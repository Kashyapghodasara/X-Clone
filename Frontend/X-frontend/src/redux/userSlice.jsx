import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
    },
    reducers: {      // It has multiple actions
        getUser: (state, action) => {
            state.user = action.payload;    // same as req.body
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        getProfile: (state, actions) => {
            state.profile = actions.payload;
        },
        followingUpdate: (state, action) => {
            if (state.user && state.user.following) {  // Added a check here
                if (state.user.following.includes(action.payload)) {
                    // Unfollow
                    state.user.following = state.user.following.filter((iId) => iId !== action.payload);
                } else {
                    // Follow
                    state.user.following.push(action.payload);
                }
            }
        }
    }
});

export const { getUser, getOtherUsers, getProfile, followingUpdate } = userSlice.actions;
export default userSlice.reducer;
