import React from 'react'
import Navbar from '../landing/Navbar'
import BottomProfile from './bottomProfile'
import SideProfile from './sideProfile'
import TopProfile from './topProfile'

const Profile = () => {
  return (
    <div className='Navbar w-full h-auto py-9 px-5'>
            <Navbar />
            <div className='h-screen mt-10 w-full flex'>
               <SideProfile />
               <div className=' flex-1 ml-8 w-full'>
                <TopProfile/>
                <BottomProfile/>
               </div>
            </div>
            </div>
  )
}

export default Profile