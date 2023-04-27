import React, { useState } from 'react';
import './AppointmentCard.css';
import Avatar from 'react-avatar';
import moment from 'moment';
import { updateAppointmentById } from '../../../../Doctor/Services/appointmentServices.jsx';
import Alert from '../../../../../Components/Common/Alert/SweetAlert.jsx';
import {
    selectedDoctorStateAtom
} from "../../../../../Store/globalState.jsx";
import { useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function AppointmentCard(props) {

    const alert = new Alert();
    const navigate = useNavigate();
    const { appointment } = props;
    const [status, setStatus] = useState(appointment?.appointmentData?.status);
    const setSelectedDoctor = useSetRecoilState(selectedDoctorStateAtom);

    const displayAppointmentStatus = (status) => {
        if (status == 0) {
            return (
                <div className='m-0 px-2 status-tag pending'>
                    Pending
                </div>
            )
        } else if (status == 1) {
            return (
                <p className='m-0 px-2 status-tag approved'>
                    Approved
                </p>
            )
        } else if (status == 2) {
            return (
                <p className='m-0 px-2 status-tag completed'>
                    Completed
                </p >
            )
        } else {
            return (
                <p className='m-0 px-2 status-tag cancelled'>
                    Cancelled
                </p >
            )
        }
    }
    const token = localStorage.getItem("token") || null;

    const cancelAppointmentHandler = async () => {
        const param = {
            status: 3
        }
        const headers = {
            'Authorization': token
        }

        const updatedAppointment = await updateAppointmentById(appointment?.appointmentData?._id, param, headers)
        if (updatedAppointment?.status) {
            setStatus(3);
        }
    }

    const rescheduleAppointmentHandler = () => {
        setSelectedDoctor({ ...appointment?.doctor, appointmentId: appointment?.appointmentData?._id });
        navigate('/patient/book-appointment');
    }

    const openCancelPopup = () => {
        alert.manageAppointmentBox('Are you sure?', "You won't be able to revert this!", { cancelAppointmentHandler }, { rescheduleAppointmentHandler })
    }

    return (
        <div className='col-lg-4 col-md-6'>
            <div className="admin-appointment-container my-3">
                <div className="admin-appointment-card-container row m-0">
                    <div className="admin-appointment-card-preview col-5">
                        <>{displayAppointmentStatus(status)}</>
                        <Avatar
                            className='d-block mb-1 mt-5 mx-auto'
                            round
                            size='100'
                            name={`${appointment?.doctor?.fName} ${appointment?.doctor?.lName}`}
                            src={appointment?.doctor?.profileImg}
                        />
                        <p className="h4 m-0 pt-3 text-center font-weight-bold">Dr. {appointment?.doctor?.fName}</p>
                        <p className="h4 m-0 text-center font-weight-bold">{appointment?.doctor?.lName}</p>
                        <p className="h5 m-0 pt-2 text-center text-secondary break-line-1">{appointment?.doctor?.department?.name}</p>
                        <p className="h6 m-0 pt-2 text-center text-secondary">+91 {appointment?.doctor?.mobileNo}</p>
                    </div>
                    <div className={`admin-appointment-card-info text-center d-flex flex-column text-light col-7 ${(status == 2 || status == 3) ? 'justify-content-center align-items-center' : ''}`}>
                        <div className={`text-right w-100 mb-4 ${(status == 2 || status == 3) ? 'd-none' : ''}`}>
                            <IconButton
                                size="small"
                                className='btn-edit-appointment'
                                onClick={openCancelPopup}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </div>
                        <p className="h4 m-0 font-weight-bold">{appointment?.doctor?.hospital?.name}</p>
                        <p className="h5 m-0 pt-1">+91 {appointment?.doctor?.hospital?.mobileNo}</p>
                        <p className="h6 pt-4 m-0">Appointment Date :</p>
                        <p className="h5 m-0 font-weight-bold pt-2">{moment(new Date(appointment?.appointmentData?.appointmentDate)).format('LL')}</p>
                        <p className="h6 pt-3 m-0">Appointment Time :</p>
                        <p className="h5 m-0 font-weight-bold pt-2">{appointment?.appointmentData?.appointmentTime}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
