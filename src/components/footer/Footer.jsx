import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container row">
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li><a href="#">about us</a></li>
            <li><a href="#">our services</a></li>
            <li><a href="#">privacy policy</a></li>
            <li><a href="/">visit website</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li><a href="/FAQAccordion">FAQ</a></li>
            <li><a href="/order">shipping</a></li>
            <li><a href="/order">order status</a></li>
     
          </ul>
        </div>
        <div className="footer-col">
          <h4>Shoe Snap</h4>
          <ul>
            <li><a href="/allproducts">Explore</a></li>
            <li><a href="/order">My Orders</a></li>
            <li><a href="/wishlist">wishlist</a></li>
            <li><a href="/cart">cart</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="https://facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
