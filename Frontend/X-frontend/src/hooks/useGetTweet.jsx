import axios from 'axios'
import { TWEET_API_ENDPOINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTweet, getRefresh } from '../redux/tweetSlice'


export const useGetTweet = () => {
    const dispatch = useDispatch()
    const { refresh } = useSelector(store => store.TWEET)

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/getAllTweets`, { withCredentials: true }, {Headers: { "Content-Type": "application/json" }}
                )
                console.log(res)
                dispatch(getAllTweet(res?.data?.Tweet))
            } catch (error) {
                console.log(error)
            }
        }
        fetchTweets()
    }, [refresh]) // Add id as a dependency
}
