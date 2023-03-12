import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to={'add-doctor'}>Add Doctor</Link>
      <Link to={'update-doctor'}>Update Doctor</Link>
      <Link to={'view-doctor'}>View Doctor</Link>
    </>
  )
}