import React from 'react'
import './footer.css'
import { Link as ScrollLink } from 'react-scroll';



function Footer() {
  return (
    <>
     <footer className='footer-sec'>
        <h1 className='footer-head'>ShoeSnap ©️</h1>
        <nav className='footer-nav'>
            <a><ScrollLink to='Home' smooth={true} duration={500}>Home</ScrollLink></a>
            <a><ScrollLink to='All Products' smooth={true} duration={500}>All Products</ScrollLink></a>
            <a><ScrollLink to='Order' smooth={true} duration={500}>Order</ScrollLink></a>
            <a><ScrollLink to='Contact Us' smooth={true} duration={500}>Contact Us</ScrollLink></a>
        </nav>
            <div className='foot-list'>
                        <a><i class="fa-brands fa-instagram fa-2xl icons-cols"></i></a>
                        <a><i class="fa-brands fa-facebook fa-2xl icons-cols"></i></a>
                        <a><i class="fa-brands fa-twitter fa-2xl icons-cols"></i></a>
                        <a><i class="fa-brands fa-youtube fa-2xl icons-cols"></i></a>
            </div> 
        


        <p className='copyright-sec'>© 2024 ShoeSnap. All rights reserved.</p>
    </footer>




    </>
  )
}

export default Footer