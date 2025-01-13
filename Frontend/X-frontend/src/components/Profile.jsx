import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Avatar from 'react-avatar';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { PiCalendarDotsBold } from "react-icons/pi";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant.jsx';
import { followingUpdate } from '../redux/userSlice.jsx';
import { getRefresh } from '../redux/tweetSlice.jsx';
import { BsBalloonFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { format } from 'date-fns';

const Profile = () => {

  const { user, profile } = useSelector(store => store.user)
  const { allTweet } = useSelector(store => store.TWEET)     // This is initialState
  const { id } = useParams();
  useGetProfile(id)    // Call custom Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [profilePostCount, setProfilePostCount] = useState(0);

  useEffect(() => {
    // Calculate posts where the tweet's userId matches the profile's _id
    const count = allTweet?.filter(tweet => tweet?.userId === profile?._id).length || 0;
    setProfilePostCount(count);
    dispatch(getRefresh());
  }, [allTweet, profile]);


  const follow_unfollow_Handler = async () => {
    try {
      const endpoint = user?.following?.includes(id)
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
  };

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
        <div className="relative -mt-[65px] ml-4 hover:cursor-pointer">
          <Avatar
            src={profile?.profilePic ? `${USER_API_ENDPOINT.replace('/api/v1/user', '')}${profile?.profilePic}` : null}
            size="130"
            round={true}
            onClick={
              user?._id === profile?._id
                ? () => navigate(`/uploadPhoto/${profile?._id}`)
                : null
            }
            className="border-[7px] border-black object-cover"
            style={{ border: "none" }}
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
              <button onClick={() => { navigate(`/updateProfile/${profile._id}`) }}
                className="text-md px-4 py-1 font-semibold bg-transparent outline outline-2 hover:cursor-pointer rounded-full outline-gray-500">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={follow_unfollow_Handler}
                className={`text-md px-4 py-1 font-semibold ${user?.following?.includes(id)
                  ? "bg-transparent outline outline-2 outline-gray-500"
                  : "text-black bg-white outline outline-2"
                  } hover:cursor-pointer rounded-full`}
              >
                {user?.following?.includes(id) ? "Following" : "Follow"}
              </button>
            )
          }

        </div>
        <h3 className="text-sm text-gray-500">@{profile?.username}</h3>
      </div>

      <div className='px-5 mb-5'>
        <p>{profile?.description}</p>
      </div>
      <div className='px-5 mb-5 items-center flex flex-row gap-1 text-gray-200 text-md'>
        <FaLocationDot />
        <p>{profile?.location}</p>
      </div>

      <div className="flex flex-row gap-10 px-5 text-gray-500 items-center">
        <div className='flex flex-row gap-1 items-center'>
          <PiCalendarDotsBold className='text-xl' />
          <h1>Joined {new Date(profile?.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</h1>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <BsBalloonFill className='item-center text-xl' />
          <h1>{profile?.birthdate ? format(new Date(profile.birthdate), 'dd-MM-yyyy') : ''}</h1>
        </div>
      </div>

      <div className='flex flex-row items-center p-5 gap-4'>
        <h1 className='font-normal text-gray-500'><span className='font-bold mr-1 text-white'>{`${profile?.following?.length}`}</span>Following</h1>
        <h1 className='font-normal text-gray-500'><span className='font-bold mr-1 text-white'>{`${profile?.followers?.length}`}</span>Followers</h1>
      </div>
    </div>
  );
};

export default Profile;
