import { ethers } from 'ethers'
import React, { useContext, useState } from 'react'
import { BContext } from '../../context/BContext'

const TopProfile = () => {
  const [bed, setBed] = useState(0)
  const [loading, setLoading] = useState(false)

  const { briskAddress, abi } = useContext(BContext)

  const updateBed = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const briskContract = new ethers.Contract(briskAddress, abi, signer)

    try {
      await briskContract.updateStatus(bed)
      setLoading(false)
      setBed(0)
    } catch (error) {
      setLoading(false)
      alert("Error occured try again")
      setBed(0)
      console.log(error)
      return
    }
  }

  return (
    <div className='bg-[#D9D9D9] w-[900px]'>
      <div className='flex flex-col border-3 w-full p-5 gap-5 border-gray-700'>
        <div className='text-white feature-header self-center text-[44px] text-center text-xl font-semibold'><h1>SET SPACE AVAILAIBILITY</h1></div>
        <div className='flex gap-2 flex-col '>
          <label className='font-bold text-black' >Rating</label>
          <input type='number' value={bed} onChange={(e) => setBed(e.target.value)} className='bg-transparent text-black pl-2 border-black w-100 h-10 border-2 rounded-lg' placeholder='Bed Space' />
          <div onClick={updateBed} className='bg-[#9A37E7] h-10 text-white rounded-lg px-2 ml-auto py-2 cursor-pointer'>
            {loading ? "Loading..." : "Update"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopProfile