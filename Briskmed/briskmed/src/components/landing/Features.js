import React from 'react'
import blackgirl from '../../assets/images/black-girl1.jpg';
import blackwoman from '../../assets/images/black-girl2.jpg';

const Features = () => {
  return (
    <div className='flex flex-col'>
        <div className="feature-header flex flex-col items-center justify-center">
            <p className='capitalize'>features</p>
            <h1 className='text-[36px] text-center py-5'>GET QUICK MEDCARE AND SEE REVIEWS</h1>
        </div>
        <div className="flex flex-row justify-center gap-8 items-center my-11">
            <div className='image-wrapper w-60 h-96 shadow-lg rounded-lg  object-cover flex flex-col items-center justify-center p-10 bg-white'>
                <img src={blackgirl} alt="first-black" className='h-2/3 rounded-lg'/>
                <div className='image-caption flex flex-col items-center justify-center'>
                    <h1 className='bold pt-4 text-[15px] font-semibold'>Space Availability</h1>
                    <p className='text-muted text-[12px]'>Briskmed Lets you know when there's Availability for patients in a Hospital</p>
                </div>
            </div>
            <div className='image-wrapper w-60 h-96 shadow-lg rounded-lg  object-cover flex flex-col items-center justify-center p-10 bg-white'>
                <img src={blackwoman} alt="second- black woman" className='h-2/3 rounded-lg' />
                <div className='image-caption flex flex-col items-center justify-center'>
                    <h1 className='bold pt-4 text-[15px] font-semibold'>Reviews/Ratings</h1>
                    <p className='text-muted text-[12px]'>Reputation is a Valuable, strategic asset that can help in the choice of getting better Healthcare.  </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features