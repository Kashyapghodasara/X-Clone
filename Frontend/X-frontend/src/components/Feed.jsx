import React from 'react'
import Createpost from './Createpost'
import Tweet from './Tweet'

const feed = () => {
  return (
    <div className='w-[62%] border border-gray-700 rounded-md'>
      <Createpost />
      <Tweet />
    </div>
  )
}

export default feed