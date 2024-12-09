import React from 'react'
import Leftsidebar from './Leftsidebar'
import Feed from './Feed'
import Rightsidebar from './Rightsidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
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