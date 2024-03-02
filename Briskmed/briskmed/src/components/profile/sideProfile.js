import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import ProfileP from '../../assets/images/hospital1.jpg'
import { BContext } from '../../context/BContext'

const SideProfile = () => {
  const { briskAddress, abi } = useContext(BContext)

  const [hospital, setHospital] = useState()

  const updateUIValues = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const briskContract = new ethers.Contract(briskAddress, abi, provider)

    const allHospital = await briskContract.HospitalProfile(accounts[0])
    console.log(allHospital)

    setHospital(allHospital)

    console.log(hospital)

  }


  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 1000);
  })

  return (
    <div className='bg-[#D9D9D9] w-[100px] rounded-r-2xl flex-1 '>
      <div className='justify-center flex-1 items-center'>
        <img src={ProfileP} alt='Profile' className='rounded-2xl w-[250px] mx-36 mt-10 h-[250px]' />
        <div className='text-center'>
          <div className='text-4xl font-bold'>{hospital?.name}</div>
          <div className='text-2xl p-2 text-red-500 font-bold'>{hospital?.location}</div>
          <div className='text-xl p-2 font-bold'>{hospital?.desc}</div>
          <div className='text-xl p-2 font-bold'>Specialtes</div>
          <div className='mt-28'>
            <ul className='flex-1 gap-5'>
              <li className=' mb-5 profile-btn'>
                <div className='capitalize bg-green-500 font-bold text-xl text-center w-full py-3 px-3' >
                  <text> {hospital?.bed?.toString()} Beds Available</text>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideProfile