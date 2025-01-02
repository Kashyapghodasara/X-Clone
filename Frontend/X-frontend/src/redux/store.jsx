import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice.jsx'
import tweetSlice from './tweetSlice.jsx'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({     // If you have More than 1 Slice
    user: userSlice,
    TWEET: tweetSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    /* {      // Multiple Actions
        user: userSlice,
        TWEET: tweetSlice
    } */
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store