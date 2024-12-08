import React from 'react';
import Avatar from 'react-avatar';
import { FiImage } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import { LuListChecks } from "react-icons/lu";
import { RiEmotionHappyLine } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";

const Createpost = () => {
    return (
        <div className="border border-transparent border-white m-2 mb-5 shadow-lg transition duration-200 ease-in-out p-4 rounded-md">
            <div className="flex items-center w-full justify-around">
                <div>
                    <h1 className="text-gray-500 cursor-pointer hover:text-white transition">For You</h1>
                </div>
                <div className="w-[2px] h-[30px] bg-zinc-600"></div>
                <div>
                    <h1 className="text-gray-500 cursor-pointer hover:text-white transition">Following</h1>
                </div>
            </div>
            <div className="mt-[10px]">
                <hr />
            </div>
            <div className="flex items-start mt-4">
                <Avatar
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s'
                    size="50"
                    round={true}
                    style={{ objectFit: 'cover' }}
                    className="mr-4"
                />
                <textarea
                    className="w-[80%] h-[90px] bg-transparent flex flex-grow outline-none rounded-md text-white placeholder-gray-400 resize-none scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-900"
                    placeholder="What is Happening?"
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
                    <button className="bg-[#1D9BF0] text-[15px] text-white px-4 py-2 rounded-full hover:bg-[#1a8cd8] transition">
                        POST
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Createpost;
