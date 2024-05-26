import React from 'react';
import './ContactUs.css';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const ContactUs = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    formData.append('access_key', '34221a43-8daf-4c14-8ba0-aa1b1a2c3182');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      alert('Failed to send the message, please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='contactusPage'>
        <div id="contact-container">
          <h1 className='contacthead'>Contact US</h1>
          <form id="form" className="topBefore" onSubmit={handleSubmit}>
            <input className='contactInp' id="name" type="text" name="name" placeholder="NAME" required />
            <input className='contactInp' id="email" type="email" name="email" placeholder="E-MAIL" required />
            <textarea  className="contactTxtarea"id="message" name="message" placeholder="MESSAGE" required></textarea>
            <input className='contactInp' id="submit" type="submit" value="GO!" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
