import React, { useContext, useEffect, useState } from 'react';
import Hospital1 from '../../assets/images/hospital1.jpg';
import { BContext } from '../../context/BContext';
import { ethers } from 'ethers'
import { Link } from "react-router-dom";

const Discovery = () => {
    const { briskAddress, abi } = useContext(BContext)

    const [hospital, setHospital] = useState()
    const [text, setText] = useState("")

    const updateUIValues = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const briskContract = new ethers.Contract(briskAddress, abi, provider)

        const allHospital = await briskContract.getAllHospital()
        console.log(allHospital)

        let arr = []

        for (let i = 0; i < allHospital.length; i++) {
            let prof = await briskContract.getProfile(allHospital[i])

            console.log(prof)

            if (i < 3) {
                arr.push(prof)
            }
        }

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
        <div className='flex flex-col'>
            <div className='discovery-header w-full h-40 py-11 flex items-center justify-center'>
                <h1 className='text-[36px] font-[900] h-[42px] w-[519px] text-center'>HEALTHCARE AROUND ME</h1>
            </div>
            <div className='result-section h-[545px] w-full'>
                <div className="flex flex-row justify-center gap-11 items-center my-11">
                    {hospital?.map((item) => (
                        <Link to={`/reviews/${item?.addr}`}>
                            <div className='image-wrapper w-80 h-96 shadow-lg rounded-lg  object-cover flex flex-col items-center justify-center py-8 px-10 bg-white'>
                                <img src={Hospital1} alt="first-black" className='rounded-lg' />
                                <div className='image-caption flex flex-col items-center justify-center'>
                                    <h1 className='bold pt-4 text-[20px] font-bold'>{item?.name}</h1>
                                    <p className='text-muted text-[17px]'>{item?.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Discovery