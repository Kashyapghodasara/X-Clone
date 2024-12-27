import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.jsx'
import tweetSlice from './tweetSlice.jsx'

export const store = configureStore({
    reducer: {      // Multiple Actions
        user: userSlice,
        TWEET: tweetSlice
    }
})

export default store