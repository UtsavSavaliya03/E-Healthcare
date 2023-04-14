import React from 'react';
import './Backup.css';
import { Helmet } from "react-helmet";
import BackupCard from './Components/BackupCard';

export default function Backup() {
  return (
    <div className='backup-container'>
      <Helmet>
        <title>Backup | Health Horizon</title>
      </Helmet>
      <div className='px-5 py-4'>
        <div className='header'>
          <h3 className='text-blue'>Backup</h3>
          <div className='horizontal-bar'></div>
        </div >
        <BackupCard  title={'hospitals'} />
        <BackupCard  title={'laboratories'} />
        <BackupCard title={'doctors'} />
        <BackupCard title={'patients'} />
      </div>
    </div>
  )
}