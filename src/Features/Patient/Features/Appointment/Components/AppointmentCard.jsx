import React from 'react';
import './AppointmentCard.css';
import moment from 'moment/moment';
import Avatar from 'react-avatar';

export default function AppointmentCard(props) {
    const { appointments } = props;

    const displayAppointmentStatus = (status) => {
        if (status == 0) {
            return (
                <p className='m-0 pending-status-tag px-2'>
                    Pending
                </p>
            )
        } else if (status == 1) {
            return (
                <p className='m-0 approved-status-tag px-2'>
                    Approved
                </p>
            )
        } else if (status == 2) {
            return (
                <p className='m-0 completed-status-tag px-2'>
                    Completed
                </p >
            )
        } else {
            return (
                <p className='m-0 cancelled-status-tag px-2'>
                    Cancelled
                </p >
            )
        }
    }

    return (
        <>
            {
                appointments.map((appointment, index) => {
                    return (
                        <div className='col-lg-6 px-3 my-3' key={index}>
                            <div className="apt-main-container d-flex">
                                <div className="apt-img-section align-items-start" >
                                    <Avatar className='apt-img' size='70' round name={`${appointment?.doctor?.fName} ${appointment?.doctor?.lName}`} src={appointment?.doctor?.profileImg} />
                                </div>
                                <div className="apt-info ml-5">
                                    <h4 className='text-blue font-weight-bold'> {`${appointment?.doctor?.fName} ${appointment?.doctor?.lName}`}</h4>
                                    <div className='apt-name-bar'></div>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Department:</span>
                                        <span> {appointment?.doctor?.department?.name}</span>
                                    </p>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Hospital:</span>
                                        <span> {appointment?.doctor?.hospital?.name}</span>
                                    </p>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Contact No:</span>
                                        <span>+91 {appointment?.doctor?.mobileNo}</span>
                                    </p>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Appointment Date:</span>
                                        <span> {moment(appointment?.appointmentData?.appointmentDate).format('LL')}</span>
                                    </p>

                                    <p className='my-2'>
                                        <span className='apt-info-head'>Appointment Time:</span>
                                        <span> {appointment?.appointmentData?.appointmentTime}
                                        </span>
                                    </p>
                                </div>
                                <div className='status-container text-right'>
                                    {displayAppointmentStatus(appointment?.appointmentData?.status)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}