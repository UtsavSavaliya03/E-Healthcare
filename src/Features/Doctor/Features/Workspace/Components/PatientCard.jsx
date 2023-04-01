import React from 'react';
import './PatientCard.css';
import Avatar from 'react-avatar';

export default function PatientCard() {
  return (
    <div className='col-lg-3 col-md-4 col-12'>
        <div className='patient-card-container py-3 px-3 my-3'>
            <div className="header d-flex">
                <Avatar round size='45' name='Utsa Savaliya' />
                <div className='ml-2'>
                    <p className='m-0 text-blue break-line-1'>Utsav Savaliya</p>
                    <p className='m-0 user-email text-muted break-line-1'>udsavaliya03@gmail.com</p>
                </div>
            </div>
            <hr />
            <div className='body'>
                <div className='d-flex pb-2'>
                    <p className='m-0 d-inline'>Patient Id: </p>
                    <p className='m-0 d-inline ml-2 text-blue'>MSU74D2W</p>
                </div>
                <div className='d-flex pb-2'>
                    <p className='m-0'>Age: </p>
                    <p className='m-0 d-inline ml-5'>20</p>
                </div>
                <div className='d-flex'>
                    <p className='m-0'>Address:</p>
                    <p className='m-0 ml-3 break-line-2'>120 - Tapidarshan, Nana varachha.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
