import React, { useEffect } from 'react';
import './Aboutus.css';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/footer';

const AboutUs = () => {

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.getElementById('team-image').style.top = `${0 - (scrolled * 0.20)}px`;
      document.querySelector('.img-1').style.top = `${0 - (scrolled * 0.35)}px`;
      document.querySelector('.img-2').style.top = `${0 - (scrolled * 0.05)}px`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Navbar/>
    <div id="about-main">
      <div className="jumbotron">
        <div className="jumbotron-inner">
          <div className="top-box">
            <div className="content-box">
              <h1>About ShoeSnap</h1>
              <p>
                At ShoeSnap, we are passionate about sneakers and shoes.
                <br /> Our mission is to provide the best selection of footwear to our customers, ensuring quality and style in every step.
              </p>
            </div>
          </div>
        </div>
        <div className="img-layer-container">
          <div className="team-image" id="team-image">
            <img src="https://www.superkicks.in/cdn/shop/files/2_bd674cfb-fbb5-47f3-8e24-374053ab929c.jpg?v=1712757468&width=500" alt="Team" />
          </div>

          <div className="circles-container">
            <div className="img-1">
              <img src="https://www.superkicks.in/cdn/shop/files/3_2322194f-d5a1-434c-aab5-10fb1292811e.jpg?v=1708505230&width=170" alt="Circle 1" />
            </div>
            <div className="img-2">
              <img src="https://www.superkicks.in/cdn/shop/files/2_7799962a-0077-40f3-8db3-233c1b7b2b80.jpg?v=1712757435&width=60   " alt="Circle 2" />
            </div>
          </div>
        </div>
      </div>
      <div className="story-container">
        <div className="need-for-dx-container">
          <h3 className="text-center">Our Story</h3>
          <p>
            ShoeSnap was born out of a love for sneakers and a desire to bring the latest and greatest footwear to enthusiasts everywhere. From humble beginnings, we have grown into a trusted source for the latest trends and timeless classics.
          </p>
          <div className="img-container">
            <img src="https://www.superkicks.in/cdn/shop/files/1_f4bdfbfb-4405-4939-a38f-d14adcc409b3.jpg?v=1715691054&width=293" alt="Our Journey" className="img-responsive" />
          </div>
        </div>
        <div className="container-divider"></div>
        <div className="our-tech-container">
          <h3 className="text-center">Our Commitment</h3>
          <p>
            We are committed to offering an unparalleled selection of footwear, from the most sought-after sneakers to the most comfortable everyday shoes. Our team carefully curates our collection to ensure that every product meets our high standards of quality and style.
          </p>
          <div className="img-container">
            <img src="https://www.superkicks.in/cdn/shop/files/1_ec6fbebe-94ad-4a14-8b80-d8ed78bf4dc2.jpg?v=1713966660&width=293" alt="Our Collection" className="img-responsive" />
          </div>
        </div>
        <div className="container-divider"></div>
        <div className="origin-story-container">
          <h3 className="text-center">Origin Story</h3>
          <p>
            Founded by a group of sneaker enthusiasts, ShoeSnap began as a small shop with a big dream. Over the years, our passion for footwear has driven us to expand our offerings and reach sneaker lovers around the world.
          </p>
        </div>
        <div className="container-divider"></div>
        <div className="today-container">
          <h3 className="text-center">Flash Forward Today</h3>
          <p>
            Today, ShoeSnap is a leader in the footwear industry, known for our exclusive releases, extensive selection, and exceptional customer service. We continue to push the boundaries of what's possible in the world of shoes and sneakers.
          </p>
          <ul>
            <li>Exclusive sneaker releases</li>
            <li>Wide range of footwear for all occasions</li>
            <li>Exceptional customer service</li>
            <li>Committed to quality and style</li>
            <li>Global reach with local roots</li>
            <li>Passionate about footwear</li>
          </ul>
        </div>
        <div className="container-divider"></div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
