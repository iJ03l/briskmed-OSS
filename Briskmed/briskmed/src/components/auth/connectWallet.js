import React, { useContext } from 'react'
import Navbar from '../landing/Navbar'
import { ethers } from 'ethers';
import { BContext } from '../../context/BContext';

const Connect = () => {

  const { briskAddress, abi } = useContext(BContext)

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const briskContract = new ethers.Contract(briskAddress, abi, provider)


    try {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length > 0) {
        let prof = await briskContract.getProfile(`${accounts[0]}`)
        console.log(prof)

        if (prof?.image == "") {
          window.location.href = "/auth"
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

  return (
    <div className='Navbar h-screen w-full h-auto py-9 px-5'>
      <Navbar />
      <div className="w-full flex flex-col">
        <div className='w-full relative justify-center items-center flex flex-row'>
          <div className='search-bar'>
            <div className='grp mt-40  p-4 rounded-xl cursor-pointer border-purple-400 border-2'>
              <table onClick={connectWallet} className="text-white font-bold">Connect Wallet</table>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Connect