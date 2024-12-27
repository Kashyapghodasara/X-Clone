import React from 'react'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import { Outlet } from 'react-router-dom'
import { useGetTweet } from '../hooks/useGetTweet'

const Home = () => {

  useGetTweet()    // Call custom Hooks

  return (
    <div className='flex justify-between mt-2 w-[90%] mx-auto'>
      <Leftsidebar />
      <Outlet />
      <Rightsidebar />
    </div>
  )
}

// Dynamic Nested Rendering: Allows child routes to 
//render dynamically in a specified location within the parent component.
export default Home