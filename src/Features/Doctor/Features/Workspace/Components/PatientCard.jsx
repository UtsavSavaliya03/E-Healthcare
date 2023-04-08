import React from 'react';
import './PatientCard.css';
import Avatar from 'react-avatar';

export default function PatientCard(props) {

    const { patient } = props;

    const onClickHandler = () => {
        props.selectPatient(patient);
    }

    return (
        <div className='col-lg-3 col-md-4 col-12' onClick={onClickHandler}>
            <div className='patient-card-container py-3 px-3 my-3'>
                <div className="header d-flex">
                    <Avatar round size='45' name={`${patient?.fName} ${patient?.lName}`} />
                    <div className='ml-2'>
                        <p className='m-0 text-blue break-line-1'>{`${patient?.fName} ${patient?.lName}`}</p>
                        <p className='m-0 user-email text-muted break-line-1'>{patient?.email}</p>
                    </div>
                </div>
                <hr />
                <div className='body'>
                    <div className='d-flex pb-2'>
                        <p className='m-0 d-inline'>Patient Id: </p>
                        <p className='m-0 d-inline ml-2 text-blue'>{patient?.patientId}</p>
                    </div>
                    <div className='d-flex pb-2'>
                        <p className='m-0'>Age: </p>
                        <p className='m-0 d-inline ml-5'>{patient?.age}</p>
                    </div>
                    <div className='d-flex'>
                        <p className='m-0'>Address:</p>
                        <p className='m-0 ml-3 break-line-2'>{patient?.addressLine}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
