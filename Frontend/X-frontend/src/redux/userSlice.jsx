import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice ({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null
    },
    reducers: {      // It has multiple actions
        getUser: (state, action) => {
            state.user = action.payload    // same as req.body
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        getProfile: (state, actions) => {
            state.profile = actions.payload
        }
    }
})

export const {getUser, getOtherUsers, getProfile} = userSlice.actions;
export default userSlice.reducer