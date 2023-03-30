import React from 'react';
import './AppointmentCard.css';

export default function AppointmentCard() {
    return (
        <>
            <div className='col-lg-6 px-3 my-3'>
                <div className="apt-main-container d-flex">
                    <div className="apt-img-section align-items-start" >
                        <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" className="apt-img" alt="" />
                    </div>
                    <div className="apt-info ml-5">
                        <h4 className='text-blue font-weight-bold'>James</h4>
                        <div className='apt-name-bar'></div>
                        <p className='my-2'>
                            <span className='apt-info-head'>Patient Id:</span>
                            <span> P-111</span>
                        </p>
                        <p className='my-2'>
                            <span className='apt-info-head'>Age:</span>
                            <span> 53</span>
                        </p>
                        <p className='my-2'>
                            <span className='apt-info-head'>Contact No:</span>
                            <span> 7589858598</span>
                        </p>
                        <p className='my-2'>
                            <span className='apt-info-head'>Appointment Date:</span>
                            <span> 10th July,2023</span>
                        </p>

                        <p className='my-2'>
                            <span className='apt-info-head'>Appointment Time:</span>
                            <span> 9.30AM-10.30AM</span>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
