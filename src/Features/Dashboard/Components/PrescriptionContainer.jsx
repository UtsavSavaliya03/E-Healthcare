import React from 'react';
import "./PrescriptionContainer.css";

export default function PrescriptionContainer() {
  return (
    <div className='prescription-container row m-0 d-flex text-light'>
      <div className="prescription-content col-lg-5 col-md-10 my-lg-5 py-lg-5 p-4 ml-md-4">
        <p className='h1 mr-lg-5'>View Your E-Prescriptions <br/>Anytime, Anywhere</p>
        <button className='btnLetsGo mt-lg-5 mt-md-5'>Let's Go!</button>
      </div>
    </div>
  )
}
