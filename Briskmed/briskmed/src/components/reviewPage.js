import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import Navbar from './landing/Navbar';
import onestar from '../assets/images/onestar.png';
import Rate from './rating/Rating';
import { useLocation, useParams } from 'react-router-dom';
import { BContext } from '../context/BContext';
import { ethers } from 'ethers';
import { AiFillStar } from 'react-icons/ai'

const ReviewPage = () => {
    const { briskAddress, abi } = useContext(BContext)

    const params = useParams();
    const addr = params.addr
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [rate, setRate] = useState(0)
    const [review, setReview] = useState()

    const makeReview = async () => {
        setLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const briskContract = new ethers.Contract(briskAddress, abi, signer)

        try {
            await briskContract.postReview(addr, name, desc, rate)

        } catch (error) {
            setLoading(false)
            console.log(error)
            return
        }
    }

    const updateUIValues = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const briskContract = new ethers.Contract(briskAddress, abi, provider)

        const allReview = await briskContract.getReviews(addr)
        console.log(allReview)
        setReview(allReview)

        // let arr = []

        // for (let i = 0; i < allHospital.length; i++) {
        //     let prof = await briskContract.getProfile(allHospital[i])

        //     console.log(prof)

        //     arr.push(prof)
        // }

        // if (arr.length > 0) {
        //     setReview(arr)
        // }

        // console.log(review)

    }


    useEffect(() => {
        setTimeout(() => {
            updateUIValues()
        }, 1000);
    }, [])



    return (
        <div>
            <div className='Navbar w-full h-auto py-9 px-5'>
                <Navbar /> </div>
            <div className="flex justify-center Navbar items-start h-auto pb-10">
                <div className='image-wrapper w-4/5 h-68 shadow-lg rounded-lg  object-cover flex items-start p-4 justify-start py-8 px-10 bg-gray-100 mt-4'>
                    <div className='image-caption w-full flex flex-col items-center justify-start'>
                        {review?.map((item) => (
                            <div className='flex flex-col border-2 w-full p-4 gap-5 border-gray-700 rounded-lg'>
                                <RateStar num={parseInt(item?.rate.toString())} />
                                <p className='text-muted self-start '>{item?.review}</p>
                                <p className='text-muted self-start text-green-700'>{item?.name} {item?.userAddr.slice(0, 8)}...</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='grid w-full h-vh Navbar self-center justify-center flex-1 pt-10'>
                <div className='text-white mb-4 feature-header text-[44px] text-center text-xl font-semibold'><h1>WRITE REVIEW</h1></div>
                <input onChange={(e) => setName(e.target.value)} className='bg-transparent text-white mb-4 pl-2 w-100 h-10 border-2 rounded-lg' placeholder='Name' />
                <input onChange={(e) => setDesc(e.target.value)} className='bg-transparent text-white mb-4 pl-2 w-100 h-10 border-2 rounded-lg' placeholder='Comment' />
                <div className='flex gap-2 flex-col '>
                    <label className=' text-white' >Rating</label>
                    <select onChange={(e) => setRate(e.target.value)} className='bg-transparent text-white mb-4 pl-2 block w-1/3 h-10 border-2 rounded-lg'>
                        <option value="0" className=' text-black' >0</option>
                        <option value="1" className=' text-black' >1</option>
                        <option value="2" className=' text-black' >2</option>
                        <option value="3" className=' text-black' >3</option>
                        <option value="4" className=' text-black' >4</option>
                        <option value="5" className=' text-black' >5</option>
                    </select>
                </div>
                <div className='bg-[#9A37E7] h-10 text-white rounded-lg px-2 ml-auto py-2 cursor-pointer' onClick={makeReview}>
                    {loading ? "Loading..." : "Send Review"}
                </div>
            </div>
            <div className='Navbar h-80'></div>
        </div>
    )
}

const RateStar = ({ num }) => {
    const arr = Array(num).fill(0)
    console.log(arr.length)
    return (
        <div className='flex'>
            {arr.map((item) => (
                <AiFillStar className='text-3xl' />
            ))}
        </div>
    )
}

export default ReviewPage;