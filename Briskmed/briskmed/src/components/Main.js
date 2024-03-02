import React from 'react';
import '../index.css';
import Navbar from './landing/Navbar';
import Header from './landing/Header';
import Features from './landing/Features';
import Discovery from './landing/Discovery';
import About from './landing/About';
import Footer from './landing/Footer';

function Main() {
    const user = 'Efemena'
  return (
    <div className="App">
      <div className=''>
      {user? (
        <div>
        <div className='Navbar w-full h-auto py-9 px-5'>
          <Navbar /> </div>
        <div className='Navbar w-full h-auto py-9 px-5'>
          <Header />
        </div>
        <div className='feature-section h-screen w-full py-11'>
          <Features />
        </div>
        <div className='discovery-section h-screen w-full'>
          <Discovery />
        </div>
        {/* <div className='about-section bg-[#020410] w-full'>
          <About />
        </div> */}
        <div className='footer-section bg-[#9A37E7] w-full'>
          <Footer />
        </div>
        </div>
          ):(
            <div className='Navbar w-full h-auto py-9 px-5'>
            <Navbar />
            <div className='h-screen w-full grid place-items-center'>
                <div className='bg-transparent w-36 text-center py-1 cursor-pointer rounded-lg text-white h-10 border-2 border-[#9A37E7]'>Connect Wallet</div>
            </div>
            </div>
           ) }
      </div>
    </div>
  );
}
export default Main;