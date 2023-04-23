import React, { useEffect, useState } from 'react';
import './PatientsList.css';
import PatientCard from './PatientCard';
import { fetchAppointmentsByDate } from '../../../Services/appointmentServices.jsx';
import { Spinner } from "../../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneratePrescription from './GeneratePrescription';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../../Store/globalState';

export default function AppointmentList(props) {

    const token = localStorage.getItem('token') || null;
    const user = useRecoilValue(userState);
    const [appoinments, setAppoinments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointmentId, setAppointmentId] = useState('');

    const fetchAppointmentHandler = async () => {
        setIsLoading(true);

        const headers = {
            "Authorization": token
        }

        const params = {
            id: user?._id,
            // Fetching only approved appointments
            status: 1
        }

        const appointmentResponse = await fetchAppointmentsByDate(params, headers);
        if (appointmentResponse?.status) {
            setAppoinments(appointmentResponse?.data);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchAppointmentHandler();
    }, [])

    const setSelectedPatientHandler = (patient) => {
        setSelectedPatient(patient)
    }

    const selectAppointmentHandler = (appointmentId) => {
        setAppointmentId(appointmentId)
    }

    const renderAppointments = () => {
        return (
            <div className='row m-0 px-3'>
                {
                    appoinments?.length > 0 ? (
                        <>
                            {
                                appoinments?.map((appoinment, index) => (
                                    <PatientCard
                                        key={index}
                                        patient={appoinment?.patient}
                                        appointmentId={appoinment?._id}
                                        time={appoinment?.appointmentTime}
                                        selectPatient={setSelectedPatientHandler}
                                        selectAppointment={selectAppointmentHandler}
                                    />
                                ))
                            }
                        </>
                    ) : (
                        <div className='text-center w-100 pt-5 text-muted'>
                            <h5>No appointments for today</h5>
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <div>
            {
                isLoading ? (
                    <div className='w-100 d-flex justify-content-center pt-5 mt-5'>
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        {
                            selectedPatient ? (
                                <div className='appointment-list-container'>
                                    <div className='btn-show-all px-4 pb-3'>
                                        <IconButton className='mr-1' onClick={() => {
                                            setSelectedPatient(null);
                                        }}>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </div>
                                    <GeneratePrescription patient={selectedPatient} appointmentId={appointmentId} />
                                </div>
                            ) : (
                                renderAppointments()
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}