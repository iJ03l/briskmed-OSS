import React, { useState } from 'react'
import circle from '../../assets/svg/Vector.svg';
import search from '../../assets/svg/3d-search.svg';

const Header = () => {
    const [text, setText] = useState("")

    return (
        <div className="w-full flex flex-col">
            <div className='w-full mt-[-5rem] relative justify-center items-center flex flex-row'>
                <div className='search mr-[-40rem]'>
                    <img src={search} alt="3d-search-img" />
                </div>
                <div className='search-bar'>
                    <div className='grp'>
                        <a href={`/search/${text}`}>
                            <img src={circle} alt="circle-placeholder" />
                        </a>

                        <input title="Write name in full" onChange={(e) => setText(e.target.value)} type="text" placeholder='Hospital search..' />
                    </div>
                </div>
            </div>
        <div className='page-description mt-[-7rem] relative uppercase flex justify-center items-center'>
            <h1>Making Healthcare access, fast and effective</h1>
        </div>
    </div>
  )
}

export default Header