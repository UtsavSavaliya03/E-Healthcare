import React from 'react';
import './Appointment.css';
import { Helmet } from "react-helmet";
import AppointmentCard from './Components/AppointmentCard';

export default function Appointment() {
  return (
    <div className='appointment-container'>
      <Helmet>
        <title>Appointments | Health Horizon</title>
      </Helmet>
      <div className="section-title my-4 ">
        <h2 className='text-center font-weight-bold'>Appointments</h2>
        <div className="apt-bar mx-auto"></div>
      </div>
      <div className='row m-0'>
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </div>
    </div>
  )
}