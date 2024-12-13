import React from 'react'
import Avatar from 'react-avatar'
import { useState } from 'react'
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

const Tweet = () => {

    const [isHovered, setIsHovered] = useState(false);

    const profileDetails = {
        name: 'John Doe',
        username: '@johndoe',
        bio: 'Web developer and coffee lover who enjoys Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam consequatur nisi culpa, autem cupiditate dignissimos sed beatae deleniti itaque quas veritatis tempore odio aperiam harum, molestias inventore omnis sapiente! Ipsam. creating user-friendly designs and interactive experiences. Passionate about technology and coding.',
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
            <div className='border border-gray-400 rounded-md m-2 py-2'>
                <div className='flex ml-2 mb-[-5px]'>
                    <div
                        className="relative inline-block"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Avatar */}
                        <img
                            className="hover:cursor-pointer ml-2 mt-1 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s"
                            alt="Avatar"
                            style={{ width: '50px', height: '50px' }}
                        />

                        {/* Profile Details Box */}
                        {isHovered && (
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
                    {/*  <Avatar className="hover:cursor-pointer ml-2 mt-1" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s' size='50' round={true} /> */}
                    <div className='flex flex-row items-center mt-0'>
                        <h1 className="m-4 mt-0 text-lg font-bold hover:underline hover:decoration-white hover:underline-offset-1 hover:cursor-pointer">
                            Kashyap Ghodasara
                        </h1>
                        <h1 className='text-gray-600 m-4 ml-[-2px] mt-0'>@kashyappatel</h1>
                        <h2 className='text-gray-600 text-sm m-4 ml-[-10px] mt-0'>•3h</h2>
                    </div>
                </div>
                <div className='flex flex-col ml-[80px] mt-[-10px] mb-3'>
                    <p>Hello Guys. This is my first tweet lorem😍</p>
                    <p>Hiieyy</p>
                </div>
                <div className="flex flex-row justify-around ">
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <div className="relative">
                            <FaRegComment className="relative z-0 group-hover:text-blue-500" />
                            <div className="absolute -inset-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-all duration-300 ease-in-out"></div>
                        </div>
                        <h1 className="group-hover:text-blue-500 transition-colors duration-300 ease-in-out">0</h1>
                    </div>
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <div className="relative">
                            <FaRegHeart className="relative z-0 group-hover:text-red-500" />
                            <div className="absolute -inset-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-20 transition-all duration-300 ease-in-out"></div>
                        </div>
                        <h1 className="group-hover:text-red-500 transition-colors duration-300 ease-in-out">0</h1>
                    </div>
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <div className="relative">
                            <FaRegBookmark className="relative z-0 group-hover:text-blue-700" />
                            <div className="absolute -inset-2 rounded-full bg-blue-700 opacity-0 group-hover:opacity-20 transition-all duration-300 ease-in-out"></div>
                        </div>
                        <h1 className="group-hover:text-blue-700 transition-colors duration-300 ease-in-out">0</h1>
                    </div>
                </div>
            </div>

           

        </div>
    )
}

export default Tweet