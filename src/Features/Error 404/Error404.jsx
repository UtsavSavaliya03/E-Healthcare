import React from 'react';
import { Helmet } from 'react-helmet';
import './Error404.css';
import { useNavigate } from 'react-router-dom';

export default function Error404() {

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Page Not Found | Health Horizon</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className='error404-container'>
        <div className='d-block mx-auto link-container p-4'>
          <a onClick={() => navigate(-1)} className='additional-link'>
            <i class="fas fa-arrow-left mr-2"></i>
            Back
          </a>
        </div>
      </div>
    </>
  )
}