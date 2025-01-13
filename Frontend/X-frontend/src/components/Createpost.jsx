import React from 'react';
import Avatar from 'react-avatar';
import { FiImage } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import { LuListChecks } from "react-icons/lu";
import { RiEmotionHappyLine } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { useState } from 'react';
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllTweet, getIsActive, getRefresh } from '../redux/tweetSlice';
import axios from 'axios';
import toast from 'react-hot-toast';


const Createpost = () => {

    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const { user, profile } = useSelector(store => store.user)
    const { isActive } = useSelector(store => store.TWEET)

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description, id: user._id }, { withCredentials: true })
            /* console.log(res)  */
            dispatch(getRefresh())
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(res.data.message)
        }
        setDescription("")
    }

    // This called Track
    const forYouHandler = () => {
        dispatch(getIsActive(true))
    }
    const followingHandler = () => {
        dispatch(getIsActive(false))
    }
    return (
        <div className="border border-transparent border-white m-2 mb-5 shadow-lg transition duration-200 ease-in-out p-4 rounded-md">
            <div className="flex items-center w-full justify-around">
                <div>
                    <h1 onClick={forYouHandler} className={`${isActive ? "border-b-2 border-blue-600 border-spacing-y-8 text-white" : null} text-gray-500 cursor-pointer hover:text-white transition`}>For You</h1>
                </div>
                <div className="w-[2px] h-[30px] bg-zinc-600"></div>
                <div>
                    <h1 onClick={followingHandler} className={`${isActive ? null : "border-b-2 border-blue-600 border-spacing-y-8 text-white"}text-gray-500 cursor-pointer hover:text-white transition`}>Following</h1>
                </div>
            </div>
            <div className="mt-[10px]">
                <hr />
            </div>
            <div className="flex items-start mt-4">
                <Avatar
                   src={user?.profilePic ? `${USER_API_ENDPOINT.replace('/api/v1/user', '')}${user?.profilePic}` : null}
                    size="50"
                    round={true}
                    style={{ objectFit: 'cover' }}
                    className="mr-4 object-cover"
                />
                <textarea
                    className="w-[80%] h-[90px] bg-transparent flex flex-grow outline-none rounded-md text-white placeholder-gray-400 resize-none scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-900"
                    placeholder="What is Happening?"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                ></textarea>
            </div>


            <div className="flex justify-between items-center ">
                <div className="flex flex-row gap-4 text-[22px] text-gray-500 ">
                    <FiImage className='hover:text-white transition' />
                    <MdOutlineGifBox className='hover:text-white transition' />
                    <LuListChecks className='hover:text-white transition' />
                    <RiEmotionHappyLine className='hover:text-white transition' />
                    <RiCalendarScheduleFill className='hover:text-white transition' />
                    <MdOutlineLocationOn className='hover:text-white transition' />
                </div>
                <div>
                    <button onClick={submitHandler} className="bg-[#1D9BF0] text-[15px] text-white px-4 py-2 rounded-full hover:bg-[#1a8cd8] transition">
                        POST
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Createpost;
