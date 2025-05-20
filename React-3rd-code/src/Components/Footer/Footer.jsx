import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#333] text-white p-[20px 0] text-center mt-[50px]'>
        <div className='flex justify-around flex-wrap max-w-[1200px] m-auto p-[20px]'>
            <div className='flex-1/2 min-w-[250px] m-[10px]'>
                <h2 className='text-[1.5em] mb-[10px]'>About Us</h2>
                <p className='text-[1em] text-[#ccc] '>Easy-Mart offers the best deals on your favorite products. We ensure quality and affordability.</p>
            </div>
            <div class="footer-section links">
                <h2 className='text-[1.5em] mb-[10px]'>Quick Links</h2>
                <ul className='text-[1em] text-[#ccc] list-none p-0'>
                    <li className='m-[5px 0]'><a className='text-[#f39c12] transition-[0.3s] hover:text-[#e67e22]' href="#">Home</a></li>
                    <li className='m-[5px 0]'><a className='text-[#f39c12] transition-[0.3s] hover:text-[#e67e22]' href="#">Shop</a></li>
                    <li className='m-[5px 0]'><a className='text-[#f39c12] transition-[0.3s] hover:text-[#e67e22]' href="#">About</a></li>
                    <li className='m-[5px 0]'><a className='text-[#f39c12] transition-[0.3s] hover:text-[#e67e22]' href="#">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section contact">
                <h2 className='text-[1.5em] mb-[10px]'>Contact Us</h2>
                <p className='text-[1em] text-[#ccc] '>Email: hamzasheikh7745@gmail.com</p>
                <p className='text-[1em] text-[#ccc] '>Phone: +92 3092075995</p>
                <p className='text-[1em] text-[#ccc] '>Address: Abdullah shsh ghazi goth, scheme 33, Karachi, Pakistan.</p>
            </div>
        </div>
        <div className='bg-[#222] p-[10px 0] text-[0.9em]'>
            <p className='m-0 text-[#bbb]'>&copy; 2024 Easy-Mart. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer