import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import building from "../../assets/images/building.png"
import { BContext } from '../../context/BContext'
import axios from 'axios'
const Create = () => {

  const { briskAddress, abi } = useContext(BContext)


  const [file, setFile] = useState()
  const [lin, setLin] = useState()
  const [name, setName] = useState("")
  const [loc, setLoc] = useState("")
  const [desc, setDesc] = useState("")
  const [ipfsHash, setIpfsHash] = useState('')
  const [ipfsHash2, setIpfsHash2] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    setLoading(true)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const briskContract = new ethers.Contract(briskAddress, abi, signer)

    if (file) {
      console.log('starting')
      console.log(file)

      const formData = new FormData()

      formData.append("file", file)

      const API_KEY = "194b413d599fe41e79d5"
      const API_SECRET = "91668b71fc76cca7e55bcf83c9ecb6ce0e8a2c544da78fab6b76d444f0be7151"

      console.log(formData)
      console.log(API_KEY)
      console.log(API_SECRET)

      // the endpoint needed to upload the file
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`


      await axios.post(
        url,
        formData,
        {
          maxContentLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET

          }
        }
      )
        .then(async (response) => {
          console.log(response)
          setIpfsHash(response.data.IpfsHash)

          await axios.post(
            url,
            formData,
            {
              maxContentLength: "Infinity",
              headers: {
                "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
                'pinata_api_key': API_KEY,
                'pinata_secret_api_key': API_SECRET

              }
            }
          )
            .then(async (res) => {
              console.log(res)
              setIpfsHash2(res.data.IpfsHash)

              await window.ethereum.request({ method: 'eth_requestAccounts', })

              await briskContract.createProfile(name, desc, loc, "0", "0", response.data.IpfsHash, res.data.IpfsHash)

              window.location.href = "/profile"


            })

        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })


      // get the hash

    } else {
      setLoading(false)
      alert("SELECT A FILE")
      return
    }

  }


  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const briskContract = new ethers.Contract(briskAddress, abi, provider)


    try {

      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length > 0) {
        let prof = await briskContract.getProfile(`${accounts[0]}`)
        console.log(prof)

        if (prof?.image == "") {
          return
        } else {
          window.location.href = "/profile"
        }

      } else {
        console.log("no metamask")
      }
    } catch (err) {
      console.log("an error occured")
    }
  }

  useEffect(() => {
    connectWallet()
  })



  return (
    <div className='grid w-full h-full mb-20 place-items-center'>
      <div className='text-white feature-header text-center text-3xl p-5 font-bold'><h1>CREATE HOSPITAL PROFILE</h1></div>

      <img src={building} width="300px" height="200px" />
      <p className=' text-white w-[426px] py-2 px-2 -mb-2 ' >Hospital Image:</p>
      <input type="file" onChange={(event) => setFile(event.target.files[0])} className='border-[#EAEDEE] rounded-[12px] text-white w-[426px] py-2 px-2 h-[50px] border-2' accept="image/*" />
      <p className=' text-white w-[426px] py-2 px-2 -mb-2 ' >Name:</p>
      <input maxLength="130" onChange={(e) => setName(e.target.value)} className='w-[426px] h-[50px] bg-transparent rounded-[12px] text-white border-2 pl-2' placeholder='Hospital Name' />
      <p className=' text-white w-[426px] py-2 px-2 -mb-2 ' >License:</p>
      <input type="file" onChange={(event) => setLin(event.target.files[0])} className='border-[#EAEDEE] rounded-[12px] text-white w-[426px] py-2 px-2 h-[50px] border-2' accept="image/*" />
      <p className=' text-white w-[426px] py-2 px-2 -mb-2 ' >Location:</p>
      <input onChange={(e) => setLoc(e.target.value)} className='w-[426px] h-[50px] bg-transparent rounded-[12px] text-white border-2 pl-2' placeholder='Hospital address' />

      <p className=' text-white w-[426px] py-2 px-2 -mb-2'>Description:</p>
      <textarea onChange={(e) => setDesc(e.target.value)} maxLength="100" className='w-[426px] h-[121px] rounded-[12px] text-white bg-transparent border-2 px-2' placeholder='Specialties' />
      <div onClick={handleCreate} className=' bg-white hover:bg-gray-500 cursor-pointer text-[14px] h-[41px] rounded-[12px] text-center px-2 py-2 mt-4 self-end w-[150px] text-black'>
        {loading ? "Loading..." : " Create Profile"}
      </div>
      <br />
      <br />


    </div>
  )
}

export default Create