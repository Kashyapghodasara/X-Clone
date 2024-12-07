import React from 'react'
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

const Leftsidebar = () => {
  return (
    <div className='w-[20%]'>
      <div>
        <img className="w-[36px]" src="https://cdn.worldvectorlogo.com/logos/twitter-logo-2.svg" alt="X-logo" />
      </div>
      <div className='flex flex-col px-2 py-2 my-6 gap-2 '>
        <div>
          <div className='flex item-center px-4 py-4 hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700'>
            <IoHome className='text-[28px]' />
            <h1 className='text-[20.5px] ml-2'>Home</h1>
          </div>
        </div>
        <div>
          <div className='flex item-center px-4 py-4 hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700'>
            <IoSearch className='text-[28px]' />
            <h1 className='text-[20.5px] ml-2 '>Explore</h1>
          </div>
        </div>
        <div>
          <div className='flex item-center px-4 py-4 hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700'>
            <IoNotificationsSharp className='text-[28px]' />
            <h1 className='text-[20.5px] ml-2'>Notification</h1>
          </div>
        </div>
        <div>
          <div className='flex item-center px-4 py-4 hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700'>
            <LuMessageSquareText className='text-[28px]' />
            <h1 className='text-[20.5px] ml-2'>Message</h1>
          </div>
        </div>
        <div>
          <div className='flex item-center px-4 py-4 hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700'>
            <RiAccountCircleFill className='text-[28px]' />
            <h1 className='text-[20.5px] ml-2'>Profile</h1>
          </div>
        </div>
        <div>
          <div className='flex item-center px-4 py-4 hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700'>
            <MdLogout className='text-[28px]' />
            <h1 className='text-[20.5px] ml-2'>Logout</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Leftsidebar