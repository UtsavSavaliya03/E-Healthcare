import React from 'react';
import './Dashboard.css';
import AppointmentContainer from './Components/AppointmentContainer.jsx';
import FacilityCardContainer from './Components/FacilityCardContainer.jsx';
import PrescriptionContainer from './Components/PrescriptionContainer.jsx';

export default function Dashboard() {
  return (
    <div className='user-dashboard-container'>
        <AppointmentContainer/>
        <PrescriptionContainer/>
        <FacilityCardContainer/>
    </div>
  )
}
