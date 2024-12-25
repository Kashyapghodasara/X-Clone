import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.jsx'

export const store = configureStore({
    reducer: {      // Multiple Actions
        user: userSlice
    }
})

export default store