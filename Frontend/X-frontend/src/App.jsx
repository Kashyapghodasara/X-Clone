import React from 'react'
import Home from './components/Home'
import Body from './components/Body'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='font-semibold'>
      <Body />
      <Toaster/>
    </div>
  )
} 

export default App