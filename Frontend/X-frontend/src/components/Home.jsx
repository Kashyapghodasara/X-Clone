import React, { useEffect } from 'react'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetTweet } from '../hooks/useGetTweet'
import { useSelector } from 'react-redux'

const Home = () => {
  useGetTweet()    // Call custom Hooks
  const navigate = useNavigate()
  const { user } = useSelector(store => store.user)
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [])

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