import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useGetTweet } from '../hooks/useGetTweet';
import axios from 'axios';
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/constant';
import { getRefresh } from '../redux/tweetSlice';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const Tweet = () => {
    useGetTweet();
    const { allTweet } = useSelector(store => store.TWEET);
    const { user, otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false);
    const [hoveredTweetId, setHoveredTweetId] = useState(null);

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like-dislike/${id}`, {},
                { withCredentials: true });
            dispatch(getRefresh());
            setLiked(res.data.Like);
            if (res.data.Like === true) {
                toast.success(res.data.message, { position: "top-left" });
            } else {
                toast.error(res.data.message, { position: "top-left" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Like - dislike error");
        }
    };

    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`, { withCredentials: true });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    const bookmarkHandler = async (id) => {
        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/bookmark/${id}`, {}, { withCredentials: true });
            toast.success(res?.data?.message);
            dispatch(getRefresh());
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    const getProfilePicUrl = (tweet) => {
        // First try to get the profile pic from otherUsers (which should be more up-to-date)
        const matchingUser = otherUsers?.find(user => user._id === tweet.userId);
        const profilePic = matchingUser?.profilePic || tweet?.userDetails?.[0]?.profilePic;

        if (!profilePic) return null;

        // If it's already a full URL, return as is
        if (profilePic.startsWith('http')) {
            return profilePic;
        }

        // Otherwise, construct the full URL
        const baseUrl = USER_API_ENDPOINT.split('/api/v1/user')[0];
        return `${baseUrl}${profilePic}`;
    };

    return (
        <div>
            {allTweet?.map((t) => (
                <div key={t?._id} className='border border-gray-400 rounded-md m-2 py-2'>
                    <div className='flex ml-2 mb-[-5px]'>
                        <div
                            className="relative inline-block"
                            onMouseEnter={() => setHoveredTweetId(t?._id)}
                            onMouseLeave={() => setHoveredTweetId(null)}
                        >
                            <img
                                className="hover:cursor-pointer ml-2 mt-1 rounded-full"
                                src={getProfilePicUrl(t)}
                                alt={`${t?.userDetails?.[0]?.name}'s avatar`}
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                                }}
                            />

                            {hoveredTweetId === t?._id && t?.userDetails?.[0]?._id === t?.userId && (
                                <div className="absolute left-0 mt-2 p-4 w-[200px] bg-black border rounded-lg shadow-md z-10">
                                    <p className="font-bold">{t?.userDetails?.[0]?.name}</p>
                                    <p className="text-gray-500 text-sm mb-2">{t?.userDetails?.[0]?.username}</p>
                                    <p className="text-sm mt-1">{t?.userDetails?.[0]?.description}</p>
                                    <div className="flex mt-2 text-sm">
                                        <div className="mr-4">
                                            <span className="font-semibold">{t?.userDetails?.[0]?.followers?.length}</span> Followers
                                        </div>
                                        <div>
                                            <span className="font-semibold">{t?.userDetails?.[0]?.following?.length}</span> Following
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='flex flex-row items-center mt-0'>
                            <h1 className="m-4 mt-0 text-lg font-bold hover:underline hover:decoration-white hover:underline-offset-1 hover:cursor-pointer">
                                {t?.userDetails?.[0]?.name}
                            </h1>
                            <h1 className='text-gray-600 m-4 ml-[-2px] mt-0'>{`@${t?.userDetails?.[0]?.username}`}</h1>
                            <h2 className='text-gray-600 text-sm m-4 ml-[-10px] mt-0'>
                                {`• ${formatDistanceToNow(new Date(t?.createdAt), { addSuffix: true })}`}
                            </h2>
                        </div>
                    </div>
                    <div className='MainTweet'>
                        <div className='flex flex-col ml-[80px] mt-[-20px] mb-3'>
                            <p>{t?.description}</p>
                        </div>
                        <div className="flex flex-row justify-around">
                            <div className="flex items-center space-x-2 group cursor-pointer">
                                <FaRegComment className="group-hover:text-blue-500 transition-colors duration-300 ease-in-out" />
                                <h1 className="group-hover:text-blue-500 transition-colors duration-300 ease-in-out">0</h1>
                            </div>
                            <div className="flex items-center space-x-2 group cursor-pointer">
                                <FaRegHeart
                                    onClick={() => likeOrDislikeHandler(t?._id)}
                                    className={`group-hover:text-pink-500 transition-colors duration-300 ease-in-out`}
                                />
                                <h1 className="group-hover:text-pink-500 transition-colors duration-300 ease-in-out">
                                    {t?.like?.length}
                                </h1>
                            </div>
                            <div className="flex items-center space-x-2 group cursor-pointer">
                                <FaRegBookmark
                                    onClick={() => bookmarkHandler(t?._id)}
                                    className="group-hover:text-blue-700 transition-colors duration-300 ease-in-out"
                                />
                                <h1 className="group-hover:text-blue-700 transition-colors duration-300 ease-in-out">
                                    {t?.bookmark?.length}
                                </h1>
                            </div>
                            {user?._id === t?.userId && (
                                <div className="flex items-center space-x-2 text-xl group cursor-pointer">
                                    <MdDelete
                                        onClick={() => deleteTweetHandler(t?._id)}
                                        className="group-hover:text-red-600 transition-colors duration-300 ease-in-out"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tweet;