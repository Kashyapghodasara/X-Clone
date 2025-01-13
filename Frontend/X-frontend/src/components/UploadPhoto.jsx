import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getAllTweet, getRefresh } from '../redux/tweetSlice';
import { getUser, getOtherUsers, getProfile } from '../redux/userSlice';

const UploadPhoto = () => {
    const { profile, user } = useSelector(state => state.user);
    /* const { allTweet } = useSelector(state => state.TWEET); */
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);

    const submitFileHandler = async (e) => {
        try {
            const file = e.target.files[0];

            if (!file) {
                toast.error("Please select a file.");
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error("Invalid file type. Please upload a JPEG or PNG image.");
                return;
            }

            setIsUploading(true);

            // Prepare file for upload
            const formData = new FormData();
            formData.append('profilePic', file);

            axios.defaults.withCredentials = true;
            const res = await axios.post(
                `${USER_API_ENDPOINT}/uploadPhoto/${profile?._id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // Update user profile with new data
            const updatedProfile = { ...profile, profilePic: res.data.profilePic };
            const updatedUser = { ...user, profilePic: res.data.profilePic };

            // Dispatch actions with correct data
            dispatch(getProfile(updatedProfile));
            dispatch(getUser(updatedUser));

            // Refresh other data
            dispatch(getRefresh());
            dispatch(getAllTweet());
            dispatch(getOtherUsers());

            toast.success("Profile picture updated successfully!");
            navigate(`/profile/${profile?._id}`);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg w-[50%] mx-auto">
            <h1 className="text-4xl font-semibold text-white mb-8">Upload Profile Pic</h1>
            <label
                htmlFor="fileInput"
                className={`cursor-pointer ${isUploading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white px-6 py-2 rounded-lg transition duration-300 flex items-center gap-2`}
            >
                {isUploading ? 'Uploading...' : 'Choose File'}
            </label>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={submitFileHandler}
                disabled={isUploading}
            />
            <p className="text-sm text-gray-500 mt-2">Accepted formats: JPEG, PNG</p>
        </div>
    );
};

export default UploadPhoto;


/* import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getAllTweet, getRefresh } from '../redux/tweetSlice';
import { getUser, getOtherUsers, getProfile } from '../redux/userSlice';

const UploadPhoto = () => {
    const { profile, user, otherUsers } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitFileHandler = async (e) => {
        try {
            const file = e.target.files[0];

            if (!file) {
                toast.error("Please select a file.");
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error("Invalid file type. Please upload a JPEG or PNG image.");
                return;
            }

            // Prepare file for upload
            const formData = new FormData();
            formData.append('profilePic', file);

            axios.defaults.withCredentials = true;
            console.log(formData)
            const res = await axios.post(
                `${USER_API_ENDPOINT}/uploadPhoto/${profile?._id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log(res)
            toast.success(res?.data?.message);

            dispatch(getRefresh());
            dispatch(getUser(res?.data?.profilePic));
            dispatch(getProfile(res?.data?.profilePic));
            dispatch(getOtherUsers(res?.data?.profilePic));
            dispatch(getAllTweet(res?.data?.profilePic))

            navigate(`/profile/${profile?._id}`);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to upload image.");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg w-[50%] mx-auto">
            <h1 className="text-4xl font-semibold text-white mb-8">Upload Profile Pic</h1>
            <label
                htmlFor="fileInput"
                className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Choose File
            </label>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={submitFileHandler} // Pass function reference
            />
            <p className="text-sm text-gray-500 mt-2">Accepted formats: JPEG, PNG</p>
        </div>
    );
};

export default UploadPhoto;
 */