import React, { useContext, useEffect, useState } from 'react';
import '../../index.css';
import { useLocation, useParams } from 'react-router-dom';
import { BContext } from '../../context/BContext';
import { ethers } from 'ethers';
import { AiFillStar } from 'react-icons/ai'

const Reviews = () => {
    const { briskAddress, abi } = useContext(BContext)

    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [rate, setRate] = useState(0)
    const [review, setReview] = useState()

    const makeReview = async () => {
        setLoading(true)
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const briskContract = new ethers.Contract(briskAddress, abi, signer)

        try {
            await briskContract.postReview(accounts[0], name, desc, rate)

        } catch (error) {
            setLoading(false)
            console.log(error)
            return
        }
    }

    const updateUIValues = async () => {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const briskContract = new ethers.Contract(briskAddress, abi, provider)

        const allReview = await briskContract.getReviews(accounts[0])
        console.log(allReview)
        setReview(allReview)


    }


    useEffect(() => {
        setTimeout(() => {
            updateUIValues()
        }, 1000);
    }, [])



    return (
        <div>
            <div className="flex justify-center items-start h-auto pb-10">
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

export default Reviews;