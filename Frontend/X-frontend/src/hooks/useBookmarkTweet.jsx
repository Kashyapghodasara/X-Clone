import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/constant";
import { getBookmark, getRefresh } from "../redux/tweetSlice";


export const useBookmarkTweet = () => {
     const dispatch = useDispatch();
     const {refresh} = useSelector(store => store.TWEET)
     useEffect(() => {
        const fetchBookmark = async () => {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get(`${USER_API_ENDPOINT}/getBookmark`, {})
                console.log(res);
                dispatch(getBookmark(res?.data?.bookmarkTweet))
                dispatch(getRefresh())
            } catch (error) {
                console.log(error)
            } 
        }
        fetchBookmark();
     }, [refresh])
}