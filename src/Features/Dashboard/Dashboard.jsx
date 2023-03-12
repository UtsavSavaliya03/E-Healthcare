import React from 'react';
import AppointmentContainer from './Components/AppointmentContainer.jsx';
import FacilityCardContainer from './Components/FacilityCardContainer.jsx';
import PrescriptionContainer from './Components/PrescriptionContainer.jsx';

export default function Dashboard() {
  return (
    <>
        <AppointmentContainer/>
        <PrescriptionContainer/>
        <FacilityCardContainer/>
    </>
  )
}
