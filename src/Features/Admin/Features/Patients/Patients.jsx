import React from 'react';
import './Patients.css';
import PatientProfileCard from './Components/PatientProfileCard';

export default function Patients() {
    return (
        <div className='admin-patients-container'>
            <h3 className='px-4 pt-4 text-blue'>Patients</h3>
            <div>
                <PatientProfileCard />
            </div>
        </div>
    )
}
