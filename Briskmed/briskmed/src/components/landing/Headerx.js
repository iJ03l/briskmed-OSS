import React, { useState } from 'react'
import circle from '../../assets/svg/Vector.svg';


const Headerx = () => {
  const [text, setText] = useState("")

  return (
    <div className="w-full flex flex-col">
      <div className='w-full mt-[-5rem] relative justify-center items-center flex flex-row'>
        <div className='search-bar'>
          <div className='grp'>
            <a href={`/search/${text}`}>
              <img src={circle} alt="circle-placeholder" />
            </a>
            <input title="Write name in full" onChange={(e) => setText(e.target.value)} type="text" placeholder='Hospital search..' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Headerx