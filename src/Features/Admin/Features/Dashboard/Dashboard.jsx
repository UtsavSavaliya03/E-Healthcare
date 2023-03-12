import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <div className='my-1'>
        <Link to={'add-doctor'}>Add Doctor</Link>
      </div>
      <div className='my-1'>
        <Link to={'doctor-list'}>Doctor List</Link>
      </div>
    </>
  )
}