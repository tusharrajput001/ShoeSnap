import React, { useState } from 'react';
import './FAQAccordion.css';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/footer';

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'À quelle fréquence doit-on remplacer son chauffe-eau?',
      answer: 'Aux 10 à 12 ans. Avec les années, la rouille causée par l’eau endommage le contenant de métal. Soyez aux aguets : l’apparition des premiers signes de rouille, d\'humidité au toucher du réservoir et le changement de coloration de l\'eau chaude (rougeâtre) sont autant de signes avant-coureurs que la durée de vie de votre chauffe-eau arrive à échéance.'
    },
    {
      question: 'Why is the sky blue?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
    },
    {
      question: 'Will we ever discover aliens?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
    },
    {
      question: 'How much does the Earth weigh?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
    },
    {
      question: 'How do airplanes stay up?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
    },
    {
        question: 'How do airplanes stay up?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
      },
      {
        question: 'How do airplanes stay up?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
      },
      {
        question: 'Why is the sky blue?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
      },
      {
        question: 'Why is the sky blue?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.'
      },
  ];

  return (
    <>
    <Navbar/>
    <div className="container">
      <h1 className='faqhead'>Frequently Asked Questions</h1>
      <div className="accordion">
        {faqItems.map((item, index) => (
          <div className="accordion-item" key={index}>
            <button
              aria-expanded={activeIndex === index}
              onClick={() => toggleAccordion(index)}
            >
              <span className="accordion-title">{item.question}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FAQAccordion;
