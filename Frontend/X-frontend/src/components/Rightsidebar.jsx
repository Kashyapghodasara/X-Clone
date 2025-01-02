import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { useOtherUsers } from '../hooks/useOtherUsers';
import { useSelector } from 'react-redux';
import { USER_API_ENDPOINT } from '../utils/constant';
import {followingUpdate} from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Rightsidebar = () => {

  useOtherUsers()
  const { otherUsers, user } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const follow_unfollow_Handler = async (id) => {
    try {
      const endpoint = user?.following.includes(id)
        ? `${USER_API_ENDPOINT}/unfollow/${id}`
        : `${USER_API_ENDPOINT}/follow/${id}`;

      const res = await axios.post(endpoint, {}, { withCredentials: true });
      console.log("Response:", res.data);
      toast.success(res.data.message);
      dispatch(followingUpdate(id));
      dispatch(getRefresh());
    } catch (error) {
      console.error("Error:", error?.response?.data || error?.message);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  }

  return (
    <div className='w-[25%] ml-12'>
      <div className="relative w-full group mb-3">
        {/* Icon */}
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition">
          <IoSearch />
        </span>
        {/* Input */}
        <input
          className="w-full bg-zinc-700 rounded-full p-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
        />
      </div>
      <div className='border w-[100%] border-gray-500 border-x-2 border-y-2 mb-5 rounded-2xl p-4 px-6'>
        <h1 className='font-bold text-[24px] text-gray-100'>Subscribe to Premium</h1>
        <p className='text-sm'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
        <button className='mt-2 bg-white text-black rounded-full px-4 py-2'>Subscribe</button>
      </div>
      <div>
        { /* Follow Suggestions  */}
        <h1 className='font-bold text-[24px] text-gray-100 mb-3'>Who to follow</h1>

        {otherUsers?.map((t) => {
          return (
            <div key={t?._id}>
              <div className="flex gap-1 items-center mb-3">
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s"
                  size="40"
                  round={true}
                />
                <div className="flex flex-col ml-2">
                  <Link to={`/profile/${t?._id}`}>
                    <h1 className="text-lg mt-[-5px]">{t?.name}</h1>
                  </Link>
                  <h3 className="text-sm font-normal">{`@${t?.username}`}</h3>
                </div>
                <button onClick={() => follow_unfollow_Handler(t?._id)}
                  className={`ml-auto rounded-full px-4 py-[4px] ${user?.following.includes(t?._id) ? "bg-transparent text-white outline outline-2 outline-gray-500" : "bg-white text-black"}`}>
                  {user?.following.includes(t?._id) ? "Following" : "Follow"}
                </button>
              </div>
              <hr className="border-t mb-2 border-gray-500" />
            </div>)
        })
        }

      </div>
    </div>
  )
}

export default Rightsidebar