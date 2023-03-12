import React from 'react';
import './Landing.css';
import ContactUs from './Components/ContactUs.jsx';
import Footer from './Components/Footer.jsx';
import MainContainer from './Components/MainContainer.jsx'
import Newsletter from './Components/Newsletter.jsx';
import ServiceCardContainer from './Components/ServiceCardContainer.jsx';


function Landing() {
  return (
    <div className='landing-page-container'>
      <MainContainer />
      <ServiceCardContainer />
      <ContactUs />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Landing