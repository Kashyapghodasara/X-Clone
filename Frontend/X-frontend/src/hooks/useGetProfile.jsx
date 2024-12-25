import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../redux/userSlice'

export const useGetProfile = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/profile`, { withCredentials: true })
                dispatch(getProfile(res?.data?.user))
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    }, []) // Add dependencies if needed
}
