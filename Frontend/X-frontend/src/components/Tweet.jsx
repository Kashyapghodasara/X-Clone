import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { useGetTweet } from '../hooks/useGetTweet';

const Tweet = () => {
    useGetTweet(); // Call custom Hooks
    const { allTweet } = useSelector(store => store.TWEET);

    const [hoveredTweetId, setHoveredTweetId] = useState(null);

    const profileDetails = {
        name: 'John Doe',
        username: '@johndoe',
        bio: 'Web developer and coffee lover who enjoys Lorem ipsum dolor sit amet consectetur adipisicing elit...',
        followers: 1200,
        following: 180,
    };

    // Truncate bio to 25 words
    const truncateBio = (bio, wordLimit) => {
        const words = bio.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return bio;
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
                            {/* Avatar */}
                            <img
                                className="hover:cursor-pointer ml-2 mt-1 rounded-full"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s"
                                alt="Avatar"
                                style={{ width: '50px', height: '50px' }}
                            />

                            {/* Profile Details Box */}

                            {/* userId === t?.userId   -----   pending*/}
                            {hoveredTweetId === t?._id && (   // Done
                                <div className="absolute left-0 mt-2 p-4 w-[200px] bg-black border rounded-lg shadow-md z-10">
                                    <p className="font-bold">{profileDetails.name}</p>
                                    <p className="text-gray-500 text-sm mb-2">{profileDetails.username}</p>
                                    <p className="text-sm mt-1">{truncateBio(profileDetails.bio, 18)}</p>
                                    <div className="flex mt-2 text-sm">
                                        <div className="mr-4">
                                            <span className="font-semibold">{profileDetails.followers}</span> Followers
                                        </div>
                                        <div>
                                            <span className="font-semibold">{profileDetails.following}</span> Following
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
                            <h2 className='text-gray-600 text-sm m-4 ml-[-10px] mt-0'>•3h</h2>
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
                                <FaRegHeart className="group-hover:text-red-500 transition-colors duration-300 ease-in-out" />
                                <h1 className="group-hover:text-red-500 transition-colors duration-300 ease-in-out">{t?.like.length}</h1>
                            </div>
                            <div className="flex items-center space-x-2 group cursor-pointer">
                                <FaRegBookmark className="group-hover:text-blue-700 transition-colors duration-300 ease-in-out" />
                                <h1 className="group-hover:text-blue-700 transition-colors duration-300 ease-in-out">0</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tweet;
