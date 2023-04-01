import React from 'react';
import './PatientsList.css';
import PatientCard from './PatientCard';

export default function PatientsList() {
  return (
    <div className='patients-list-container row m-0 px-2'>
      <PatientCard/>
      <PatientCard/>
      <PatientCard/>
      <PatientCard/>
      <PatientCard/>
      <PatientCard/>
      <PatientCard/>
      <PatientCard/>
    </div>
  )
}