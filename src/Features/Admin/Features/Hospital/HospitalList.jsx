import React from 'react';
import { Helmet } from "react-helmet";
import HospitalCard from './Components/HospitalCard';

export default function HospitalList() {
  return (
    <>
      <Helmet>
        <title>Hospital | Health Horizon</title>
      </Helmet>
      <div className='row m-0'>
        <HospitalCard/>
      </div>
    </>
  )
}