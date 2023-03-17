import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Health Horizon</title>
      </Helmet>
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