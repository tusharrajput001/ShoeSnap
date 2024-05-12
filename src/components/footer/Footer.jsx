  import React from 'react'
  import './footer.css'
  import {Link } from 'react-router-dom'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faInstagram, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

  function Footer() {
    return (
      <>
      <footer className='footer-sec'>
          <h1 className='footer-head'>ShoeSnap ©️</h1>
          <nav className='footer-nav'>
              <a><Link to='/'>Home</Link></a> 
              <a><Link to='/allproducts'>Explore</Link></a>
              <a><Link to='/order'>MyOrders</Link></a>
              <a><Link to='/Contact'>Contact Us</Link></a>
          </nav>
          <div className='foot-list'>
            <FontAwesomeIcon icon={faInstagram} className="fa-2x icons-cols" />
            <FontAwesomeIcon icon={faFacebook} className="fa-2x icons-cols" />
            <FontAwesomeIcon icon={faTwitter} className="fa-2x icons-cols" />
            <FontAwesomeIcon icon={faYoutube} className="fa-2x icons-cols" />
            
        </div>


          <p className='copyright-sec'>© 2024 ShoeSnap. All rights reserved.</p>
      </footer>




      </>
    )
  }

  export default Footer