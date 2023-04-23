import React, { useState, useEffect } from 'react';
import './Appointment.css';
import { Helmet } from "react-helmet";
import AppointmentCard from './Components/AppointmentCard.jsx';
import { fetchAppointments } from '../../Services/appointmentServices.jsx';
import { useRecoilValue } from "recoil";
import { userState } from '../../../../Store/globalState.jsx';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';

export default function Appointment() {
  const user = useRecoilValue(userState);

  const token = localStorage.getItem('token') || null;
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortDates = (appointments) => {
    const sortedObjectsArray = [...appointments].sort((a, b) => new Date(b?.appointmentDate) - new Date(a?.appointmentDate));
    return sortedObjectsArray;
  }

  const fetchAppointmentHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const appointments = await fetchAppointments(headers);

    console.log(appointments?.data);

    if (appointments?.status) {
      setAppointments(sortDates(appointments?.data));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointmentHandle();
  }, []);

  return (
    <div className='appointment-container'>
      <Helmet>
        <title>Appointments | Health Horizon</title>
      </Helmet>
      <div className="section-title pt-4">
        <h2 className='font-weight-bold pl-4'>Appointments</h2>
      </div>
      <hr className='mx-3' />
      <div>
      {
        isLoading ? (
          <div className='d-flex justify-content-center pt-5 mt-5'>
            <Spinner />
          </div>
        ) : (
          <div className='mb-3'>
            {
              appointments?.length > 0 ? (
                <AppointmentCard appointments={appointments} />
              ) : (
                <h4 className='text-center text-muted w-100 py-5'>No Appointment</h4>
              )
            }
          </div>
        )
      }
      </div>
    </div>
  )
}