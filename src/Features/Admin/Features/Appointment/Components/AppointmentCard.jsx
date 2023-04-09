import React from 'react';
import './AppointmentCard.css';
import moment from 'moment/moment';
import Avatar from 'react-avatar';



export default function AppointmentCard(props) {
    const { appointments } = props;
    return (
        <>
            {
                appointments.map((appointmentRecord, index) => {
                    return (
                        <div className='col-lg-6 px-3 my-3' key={index}>
                            <div className="apt-main-container d-flex">
                                <div className="apt-img-section align-items-start" >
                                <Avatar className='apt-img' size='70' round name={`${appointmentRecord?.patient?.fName} ${appointmentRecord?.patient?.lName}`} src={appointmentRecord?.patient?.profileImg} />

                                </div>
                                <div className="apt-info ml-5">
                                    <h4 className='text-blue font-weight-bold'> {`${appointmentRecord?.patient?.fName} ${appointmentRecord?.patient?.lName}`}</h4>
                                    <div className='apt-name-bar'></div>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Patient Id:</span>
                                        <span> {appointmentRecord?.patient?.patientId}</span>
                                    </p>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Age:</span>
                                        <span> {appointmentRecord?.patient?.age}</span>
                                    </p>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Contact No:</span>
                                        <span>+91 {appointmentRecord?.patient?.mobileNo}</span>
                                    </p>
                                    <p className='my-2'>
                                        <span className='apt-info-head'>Appointment Date:</span>
                                        <span> {moment(appointmentRecord?.appointmentDate).format('LL')}</span>
                                    </p>

                                    <p className='my-2'>
                                        <span className='apt-info-head'>Appointment Time:</span>
                                        <span> {appointmentRecord?.appointmentTime}</span>
                                    </p>

                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}