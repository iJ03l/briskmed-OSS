import React from 'react'
import Navbar from '../landing/Navbar'
import Create from './Create'

const Auth = () => {
  return (
    <div className='Navbar w-full h-auto py-9 px-5'>
      <Navbar />
      <div className='h-full w-full flex'>
        <Create />
      </div>
    </div>
  )
}

export default Auth