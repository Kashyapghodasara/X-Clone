import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getRefresh } from '../redux/tweetSlice';

const UploadPhoto = () => {
    const { profile } = useSelector(state => state.user);
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
            const validTypes = ['image/jpeg', 'image/png'];
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

            toast.success(res?.data?.message);
            dispatch(getRefresh());
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
