import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../redux/userSlice'

export const useGetProfile = (id) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`, { withCredentials: true })
                dispatch(getProfile(res?.data?.user))
            } catch (error) {
                console.log(error)
            }
        }
        if (id) fetchProfile()
    }, [id]) // Add id as a dependency
}
