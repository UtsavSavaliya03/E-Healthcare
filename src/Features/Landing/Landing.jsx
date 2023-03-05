import React from 'react';
import ContactUs from './Components/ContactUs.jsx';
import Footer from './Components/Footer.jsx';
import MainContainer from './Components/MainContainer.jsx'
import Newsletter from './Components/Newsletter.jsx';
import ServiceCardContainer from './Components/ServiceCardContainer.jsx';


function Landing() {
  return (
    <>
      <MainContainer />
      <ServiceCardContainer />
      <ContactUs />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Landing