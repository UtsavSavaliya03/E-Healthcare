import React from 'react';
import './PatientCard.css';
import Avatar from 'react-avatar';
import moment from 'moment';

export default function PatientCard(props) {

    const { testRequest } = props;

    const onClickHandler = () => {
        props.selectReport(testRequest);
    }

    return (
        <div className='col-lg-4 col-md-4 col-12' onClick={onClickHandler}>
            <div className='patient-card-container py-3 px-3 my-3'>
                <div className="header d-flex">
                    <Avatar round size='45' name={`${testRequest?.patient?.fName} ${testRequest?.patient?.lName}`} />
                    <div className='ml-2'>
                        <p className='m-0 text-blue break-line-1'>{`${testRequest?.patient?.fName} ${testRequest?.patient?.lName}`}</p>
                        <p className='m-0 user-email text-muted break-line-1'>{testRequest?.patient?.email}</p>
                    </div>
                </div>
                <hr />
                <div className='body'>
                    <div className='d-flex pb-2'>
                        <p className='m-0 d-inline font-weight-bold'>Patient Id: </p>
                        <p className='m-0 d-inline ml-2 text-blue'>{testRequest?.patient?.patientId}</p>
                    </div>
                    <div className='d-flex pb-2'>
                        <p className='m-0 font-weight-bold'>Test Type: </p>
                        <p className='m-0 ml-1 break-line-2 '>{testRequest?.type}</p>
                    </div>
                    <div className='d-flex pb-2'>
                        <p className='m-0 font-weight-bold'>Request Date: </p>
                        <p className='m-0 ml-1 break-line-2 '>{moment(testRequest?.createdAt).format("LLL")}</p>
                    </div>
                    <div className='d-flex pb-2'>
                        <p className='m-0 font-weight-bold'>Age: </p>
                        <p className='m-0 d-inline ml-5'>{testRequest?.patient?.age}</p>
                    </div>
                    <div className='d-flex'>
                        <p className='m-0 font-weight-bold'>Address: </p>
                        <p className='m-0 ml-3 break-line-2'>{testRequest?.patient?.addressLine}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
