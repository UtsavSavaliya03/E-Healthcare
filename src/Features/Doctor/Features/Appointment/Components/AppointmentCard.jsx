import React from 'react';
import './AppointmentCard.css';
import Avatar from 'react-avatar';
import moment from 'moment';


export default function AppointmentCard(props) {

    const { appointments } = props;

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


    return (
        <div className='row m-0'>
            {
                appointments?.map((appointment, index) => (
                    <div className='col-lg-4 col-md-6' key={index}>
                        <div className="admin-appointment-container my-3">
                            <div className="row m-0 admin-appointment-card-container row m-0">
                                <div className="col-5 admin-appointment-card-preview">
                                    <>{displayAppointmentStatus(appointment?.status)}</>
                                    <Avatar
                                        className='d-block mb-1 mt-5 mx-auto'
                                        round
                                        size='100'
                                        name={`${appointment?.patient?.fName} ${appointment?.patient?.lName}`}
                                        src={appointment?.patient?.profileImg}
                                    />
                                    <p className="h4 m-0 pt-3 text-center font-weight-bold">{appointment?.patient?.fName}</p>
                                    <p className="h4 m-0 text-center font-weight-bold">{appointment?.patient?.lName}</p>
                                    <p className="h5 m-0 pt-2 text-center break-line-1 text-secondary">{appointment?.doctor?.department?.name}</p>
                                    <p className="h6 m-0 pt-2 text-center text-secondary">+91 {appointment?.patient?.mobileNo}</p>
                                </div>
                                <div className="col-7 admin-appointment-card-info text-center d-flex flex-column align-items-center justify-content-center text-light">
                                    <p className="h6 pt-4 m-0">PatientID :</p>
                                    <p className="h4 m-0 font-weight-bold pt-2">{appointment?.patient?.patientId}</p>
                                    <p className="h6 pt-4 m-0">Appointment Date :</p>
                                    <p className="h5 m-0 font-weight-bold pt-2">{moment(appointment?.appointmentDate).format('LL')}</p>
                                    <p className="h6 pt-3 m-0">Appointment Time :</p>
                                    <p className="h5 m-0 font-weight-bold pt-2">{appointment?.appointmentTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
