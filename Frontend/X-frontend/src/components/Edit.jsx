import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Edit = () => {

  const { profile, user } = useSelector(store => store.user)

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    fullname: profile?.name,
    birthdate: formatDate(profile?.birthdate),
    location: profile?.location,
    bio: profile?.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

  };

  return (
    <div className="w-[60%] mx-auto p-6 bg-black shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        {/* Username */}
        <div>
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
            Fullname
          </label>
          <input
            type="text"
            id="Fullname"
            name="fullname"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            className="mt-1 block w-full bg-transparent placeholder:text-white bg-[#272727] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your Fullname"

          />
        </div>

        {/* Birthdate */}
        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
            Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
            className="mt-1 block w-full p-2 bg-[#272727] placeholder:text-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>


        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1 block w-full p-2 placeholder:text-white bg-[#272727] bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your location"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-1 block w-full p-2 bg-[#272727] placeholder:text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write something about yourself"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Edit;
