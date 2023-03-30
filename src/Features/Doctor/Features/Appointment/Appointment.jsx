import React from 'react';
import { Helmet } from "react-helmet";

export default function Appointment() {
  return (
    <div>
      <Helmet>
        <title>Doctor | Appointments</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1>
        Doctor's Appointment
      </h1>
    </div>
  )
}