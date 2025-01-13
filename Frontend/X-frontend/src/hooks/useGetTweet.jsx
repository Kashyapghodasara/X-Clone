import axios from 'axios'
import { TWEET_API_ENDPOINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTweet, getRefresh } from '../redux/tweetSlice'


export const useGetTweet = () => {
    const dispatch = useDispatch()
    const { refresh, isActive } = useSelector(store => store.TWEET)
    const {profile} = useSelector(store => store.user)


    const followingHandler = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getFollowingTweet`, { withCredentials: true })
            console.log(res)
            dispatch(getAllTweet(res.data.data))
        } catch (error) {
            console.log(error)
            toast.error(res.data.message)
        }
    }

    const fetchTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getAllTweets`, { withCredentials: true }, { Headers: { "Content-Type": "application/json" } }
            )
            /* console.log(res) */
            dispatch(getAllTweet(res?.data?.Tweet))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {    // For managing those, we create a isActive variable in Store
        if (isActive) {
            fetchTweets()
        } else {
            followingHandler()
        }
    }, [isActive, refresh, profile]) // Add id as a dependency
}
