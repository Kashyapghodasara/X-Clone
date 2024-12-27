import axios from 'axios'
import { TWEET_API_ENDPOINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllTweet } from '../redux/tweetSlice'


export const useGetTweet = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/getAllTweets`, { withCredentials: true })
                console.log(res)
                dispatch(getAllTweet(res?.data?.Tweet))
            } catch (error) {
                console.log(error)
            }
        }
        fetchTweets()
    }, []) // Add id as a dependency
}
