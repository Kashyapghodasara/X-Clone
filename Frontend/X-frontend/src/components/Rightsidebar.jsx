import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { useOtherUsers } from '../hooks/useOtherUsers';
import { useSelector } from 'react-redux';

const Rightsidebar = () => {

  useOtherUsers()
  const { otherUsers } = useSelector(store => store.user)

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
                <button className="ml-auto bg-white text-black rounded-full px-4 py-[4px]">Follow</button>
              </div>
              <hr className="border-t mb-2 border-gray-500" />
            </div>)
        })
        }



        {/*   <div>
          <div className="flex gap-1 items-center mb-3">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s"
              size="40"
              round={true}
            />
            <div className="flex flex-col ml-2">
              <h1 className="text-lg mt-[-5px]">Bruce Wayne</h1>
              <h3 className="text-sm font-normal">@Batman</h3>
            </div>
            <button className="ml-auto bg-white text-black rounded-full px-4 py-[4px]">Follow</button>
          </div>
          <hr className="border-t mb-2 border-gray-500" />
        </div>

        <div>
          <div className='flex gap-1 items-center mb-3'>
            <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s' size='40' round={true} />
            <div className='flex flex-col ml-2'>
              <h1 className='text-lg mt-[-5px]'>Tony Stark</h1>
              <h3 className='text-sm font-normal'>@Ironman</h3>
            </div>
            <button className='ml-auto bg-white text-black rounded-full px-4 py-[4px]'>Follow</button>
          </div>
          <hr className="border-t mb-2 border-gray-500" />
        </div>

        <div>
          <div className='flex gap-1 items-center mb-3'>
            <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s' size='40' round={true} />
            <div className='flex flex-col ml-2'>
              <h1 className='text-lg mt-[-5px]'>Steve Rogers</h1>
              <h3 className='text-sm font-normal'>@Captain America</h3>
            </div>
            <button className='ml-auto bg-white text-black rounded-full px-4 py-[4px]'>Follow</button>
          </div>
          <hr className="border-t mb-2 border-gray-500" />
        </div>
 */}

      </div>
    </div>
  )
}

export default Rightsidebar