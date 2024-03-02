import React from 'react'
import Reviews from '../reviews/Reviews'

const BottomProfile = () => {
  return (
    <div className='bg-[#D9D9D9] w-[900px] mt-8 rounded-3xl'>
        <div className='flex flex-col border-3 w-full p-5 rounded-md gap-5 border-gray-700'>
      <div className='text-white feature-header self-center text-[44px] text-center text-xl font-semibold'><h1>OUR REVIEWS</h1></div>
      <Reviews/>
      <Reviews/>           
      </div>
    </div>
  )
}

export default BottomProfile