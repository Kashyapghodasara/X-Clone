import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOtherUsers } from '../redux/userSlice'

export const useOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/getOtherUsers`, { withCredentials: true })
                console.log(res)
                dispatch(getOtherUsers(res?.data?.allUsers))
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    }, []) // Add dependencies if needed
}
