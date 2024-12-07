import React from 'react'
import Leftsidebar from './Leftsidebar'
import Feed from './Feed'
import Rightsidebar from './Rightsidebar'

const Home = () => {
  return (
    <div className='flex justify-between mt-2 w-[90%] mx-auto'>
      <Leftsidebar />
      <Feed />
      <Rightsidebar />
    </div>
  )
}

export default Home