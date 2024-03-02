import React, { useContext } from 'react';
import { ethers } from 'ethers'
import logo from '../../assets/svg/logo-light.svg';
import star from '../../assets/svg/star.svg';
import { Link } from "react-router-dom";
import { BContext } from '../../context/BContext';

const Navbar = () => {

  const { briskAddress, abi } = useContext(BContext)


  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const briskContract = new ethers.Contract(briskAddress, abi, provider)


    try {
      window.location.href = '/connectWallet'

      // let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // if (accounts.length > 0) {
      //   let prof = await briskContract.getProfile(`${accounts[0]}`)
      //   console.log(prof)

      //   if (prof?.image == "") {
      //     window.location.href = "/auth"
      //   } else {
      //     window.location.href = "/profile"
      //   }

      // } else {
      //   console.log("no metamask")
      // }
    } catch (err) {
      console.log("an error occured")
    }
  }


  return (
    <div className='flex mx-6 Navbar'>
      <div className='flex flex-row w-full justify-between items-center'>
        <div className='logo p-5 ml-5'>
          <Link to="/" className="link">
            <img src={logo} alt="light-logo" /></Link>
        </div>

        {/* buttons */}
        <div className='links flex'>
          <ul className='flex gap-5'>
            <li className='nav-btn'>
              <button className='capitalize py-3 px-3' >
                <Link onClick={connectWallet} className="link">Hospital Portal</Link>
              </button>
            </li>

            <li className='nav-btn flex flex-row'>
              <button className='flex flex-row items-center py-3 px-3 justify-center capitalize' >
                <span className='mr-2'>
                  <img src={star} alt="star-svg" />
                </span>
                <Link to="/review" className="link">Ratings/Reviews</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar