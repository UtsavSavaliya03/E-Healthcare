import React, { useState, useEffect } from 'react';
import './MyAppointments.css';
import { Helmet } from "react-helmet";
import AppointmentCard from './Components/AppointmentCard';
import { fetchAppointmentsByUser } from '../../Services/appointmentServices.jsx';
import { useRecoilValue } from "recoil";
import { userState } from '../../../../Store/globalState.jsx';

export default function MyAppointments() {
  const user = useRecoilValue(userState);

  const token = localStorage.getItem('token') || null;
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointmentHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const appointments = await fetchAppointmentsByUser(user?._id, headers);
    setAppointments(appointments?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAppointmentHandle();
  }, []);

  return (
    <div className='appointment-container'>
      <Helmet>
        <title>My Appointments | Health Horizon</title>
      </Helmet>
      <div className="section-title pt-4">
        <h2 className='font-weight-bold pl-4'>Appointments</h2>
      </div>
      <hr className='mx-3' />
      <div className='row m-0'>
        {
          appointments?.length > 0 ? (
            <AppointmentCard appointments={appointments} />

          ) : (
            <h4 className='text-center text-muted w-100 py-5'>No Appointment</h4>
          )
        }
      </div>
    </div>
  )
}