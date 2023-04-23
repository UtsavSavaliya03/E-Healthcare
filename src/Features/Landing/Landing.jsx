import React from 'react';
import './Landing.css';
import ContactUs from './Components/ContactUs.jsx';
import Footer from './Components/Footer.jsx';
import MainContainer from './Components/MainContainer.jsx'
import Newsletter from './Components/Newsletter.jsx';
import ServiceCardContainer from './Components/ServiceCardContainer.jsx';
import { Helmet } from "react-helmet";



function Landing() {
  return (
    <div className='landing-page-container'>
      <Helmet>
        <title>Health Horizon</title>
      </Helmet>
      <MainContainer />
      <ServiceCardContainer />
      <ContactUs />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Landing