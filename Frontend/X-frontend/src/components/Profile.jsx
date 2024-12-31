import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Avatar from 'react-avatar';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { PiCalendarDotsBold } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile.jsx'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';

const Profile = () => {

  const { user, profile } = useSelector(store => store.user)
  const { allTweet } = useSelector(store => store.TWEET)     // This is initialState
  const { id } = useParams();
  useGetProfile(id)    // Call custom Hooks

  const [profilePostCount, setProfilePostCount] = useState(0);

  useEffect(() => {
    // Calculate posts where the tweet's userId matches the profile's _id
    const count = allTweet?.filter(tweet => tweet?.userId === profile?._id).length || 0;
    setProfilePostCount(count);
  }, [allTweet, profile]);

  return (
    <div className="w-[62%] outline outline-1 outline-gray-500">
      <div className="sticky top-0 backdrop-blur-md z-10">
        <div>
          <Link to="/">
            <div className="py-4 px-2">
              <FaArrowLeft className="text-xl" />
            </div>
          </Link>
          <div className="px-12 flex flex-col mt-[-50px] items-start">
            <h1 className="font-bold text-xl">{profile?.name}</h1>
            {
              profilePostCount > 0 ? (
                <h2>{`${profilePostCount} Posts`}</h2>
              ) : (
                <h2>0 Posts Available</h2>
              )
            }
          </div>
        </div>
      </div>

      <hr />
      <div>
        {/* Background Image */}
        <img
          src="https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg"
          alt="BG-image"
          style={{
            height: '230px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Avatar */}
        <div className="relative -mt-[65px] ml-4">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s"
            size="130"
            round={true} // Ensures the avatar is circular
            style={{
              border: '5px solid black', // Single border
            }}
          />
        </div>
      </div>
      <div className="p-5  flex flex-col">
        {/* Profile Name and Edit Button in a Flex Container */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <h1 className="font-bold text-2xl">{profile?.name}</h1>
            <RiVerifiedBadgeFill className="text-blue-600 text-lg ml-2" />
          </div>
          {
            profile?._id === user?._id ? (
              <button className="text-md px-4 py-1 font-semibold bg-transparent outline outline-2 hover:cursor-pointer rounded-full outline-gray-500">
                Edit Profile
              </button>
            ) : (
              user?.following.includes(profile?._id) ? (
                <button className="text-md px-4 py-1 font-semibold bg-transparent outline outline-2 hover:cursor-pointer rounded-full outline-gray-500">
                  Following
                </button>
              ) : (
                <button className="text-md text-black px-4 py-1 font-semibold bg-white outline outline-2 hover:cursor-pointer rounded-full">
                  Follow
                </button>
              )
            )
          }

        </div>
        <h3 className="text-sm text-gray-500">@{profile?.username}</h3>
      </div>

      <div className='px-5 mb-5'>
        <p>This is My bio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus quas quos ducimus. Eaque repellat, magnam sunt quaerat aperiam reprehenderit vitae alias, doloribus debitis accusantium perferendis mollitia nulla commodi quas. Quasi.✨💻⚙✒</p>
      </div>
      <div className="flex flex-row gap-2 px-5 text-gray-500 items-center">
        <PiCalendarDotsBold className='text-xl' />
        <h1>{profile?.createdAt}</h1>
      </div>
      <div className='flex flex-row items-center p-5 gap-4'>
        <h1 className='font-normal text-gray-500'><span className='font-bold mr-1 text-white'>{`${profile?.following.length}`}</span>Following</h1>
        <h1 className='font-normal text-gray-500'><span className='font-bold mr-1 text-white'>{`${profile?.followers.length}`}</span>Followers</h1>
      </div>
    </div>
  );
};

export default Profile;
