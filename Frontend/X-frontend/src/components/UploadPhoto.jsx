import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const {profile} = useSelector(store => store.user)
const naviagte = useNavigate();

const submitFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    naviagte(`/profile/${profile?._id}`)
    // Work is undone
    // Now get this file and upload into store and fetch in profile and other components
}

    const uploadPhoto = () => {
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
                    onChange={(e) => { submitFileHandler(e) }}
                />
                <p className="text-sm text-gray-500 mt-2">Accepted formats: JPEG, PNG</p>
            </div>

        )
    }

    export default uploadPhoto