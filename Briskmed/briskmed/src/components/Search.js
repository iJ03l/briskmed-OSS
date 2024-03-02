import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import Headerx from './landing/Headerx';
import Navbar from './landing/Navbar';
import onestar from '../assets/images/onestar.png';
import Hospital1 from '../assets/images/hospital1.jpg';
import { BContext } from '../context/BContext';
import { ethers } from 'ethers';
import { Link, useParams } from 'react-router-dom';

const Search = () => {

  const params = useParams();
  const text = params.text

  const { briskAddress, abi } = useContext(BContext)

  const [hospital, setHospital] = useState()


  const updateUIValues = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const briskContract = new ethers.Contract(briskAddress, abi, provider)

    const allHospital = await briskContract.getAllHospital()
    console.log(allHospital)

    let arr = []

    for (let i = 0; i < allHospital.length; i++) {
      let prof = await briskContract.getProfile(allHospital[i])

      console.log(prof)

      if (prof.name.toLowerCase() == text.toLowerCase()) {
        arr.push(prof)
      }

      // arr.push(prof)
    }

    console.log(arr)

    if (arr.length > 0) {
      setHospital(arr)
    }

    console.log(hospital)

  }


  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 1000);
  })


  return (
    <div>
      <div className='Navbar w-full h-auto py-9 px-5'>
        <Navbar /> </div>
      <div className='Navbar w-full h-auto py-9 px-5'>
        <Headerx />
      </div>
      <div className="flex justify-center  items-start Navbar h-screen">
        {hospital?.map((item) => (
          <Link to={`/reviews/${item?.addr}`}>
            <div className='image-wrapper w-100 h-68 mx-20 shadow-lg rounded-lg  object-cover flex items-center p-4 justify-center py-8 px-10 bg-white'>
              <img src={`https://gateway.pinata.cloud/ipfs/${item.image}`} alt="first-black" className=' h-52 w-52 rounded-lg' />
              <div className='image-caption flex flex-col items-center justify-center'>
                <h1 className='bold pl-5 text-[40px] font-bold'>{item?.name}</h1>
                <p className='text-muted text-green-700 text-[30px]'>{item?.location}</p>
                <p className='text-muted self-start ml-4 text-[32px]'>{item?.desc}</p>
                <img src={onestar} alt="first-black" className=' w-40 justify-start self-start ml-4 rounded-md Navbar  ' />
              </div>

              <div className='Navbar justify-center  mt-40 self-end text-center text-white font-bold rounded-lg h-12 w-20'>{item?.bed.toString()} beds Available</div>
            </div>
          </Link>
        ))}

        {!hospital && (
          <div className='image-wrapper w-100 h-68 mx-20 shadow-lg rounded-lg  object-cover flex items-center p-4 justify-center py-8 px-10 bg-white'>
            <div className='image-caption flex flex-col items-center justify-center'>
              <h1 className='bold pl-5 text-[40px] font-bold'>Nothing to show</h1>
            </div>
          </div>
        )}

      </div>
    </div >
  )
}

export default Search