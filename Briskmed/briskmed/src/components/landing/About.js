import React from 'react'

const About = () => {
  return (
    <div className='flex'>
        <div className="flex flex-row about-content w-full items-center justify-center">
            <div className="left-pane m-auto flex flex-col py-11 px-10">
                <h1 className='w-[342px] text-[30px]'>WHAT IS BLOCKCHAIN?</h1>
                <p className='w-[445px] text-[20px]'>A blockchain is a type of distributed ledger technology that consists of growing list of records, called blocks, that are securely linked together using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data</p>
            </div>
            <div className='middle-partition bg-[#9A37E7] w-[28px] h-[411px]'></div>
            <div className="right-pane m-auto flex flex-col py-11 px-10">
                <h1 className='w-[342px] text-[30px]'>WHY POLYGON?</h1>
                <p  className='w-[445px] text-[20px]'> The Polygon Network’s three core upsides are;
                <br/>
                <br/>
                    Capable of fully benefiting from Ethereum’s network effects
                    Inherently more secure
                    It is more open, yet powerful enough</p>
            </div>
        </div>
    </div>
  )
}

export default About