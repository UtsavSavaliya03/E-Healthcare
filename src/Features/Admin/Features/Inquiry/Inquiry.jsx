import React, { useEffect, useState } from 'react';
import './Inquiry.css';
import { Helmet } from "react-helmet";
import { fetchEnquiry } from '../../Services/enquiryServices.jsx';
import InquiryCard from './Components/InquiryCard.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx'

export default function Inquiry() {

  const token = localStorage.getItem('token') || null;
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const fetchEnquiryHandler = async () => {

    const headers = {
      'Authorization': token
    }

    const enquiry = await fetchEnquiry(headers, alignment);
    setEnquiries(enquiry?.data)
  }

  useEffect(() => {
    fetchEnquiryHandler();
  }, [alignment])

  return (
    <div className='px-5 py-4 enquiry-container'>
      <Helmet>
        <title>Inquiry | Health Horizon</title>
      </Helmet>
      <div>
        <div className='enquiry-title ml-1 pb-4 pt-2 d-flex align-items-center'>
          <h4 className='m-0'>Inquiries</h4>
          <div className='ml-3'>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="read">Read</ToggleButton>
              <ToggleButton value="unread">Unread</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div>
          {
            loading ? (
              <div className='d-flex justify-content-center my-5 py-5'>
                <Spinner />
              </div>
            ) : (
              enquiries?.length > 0 ? (
                <div>
                  {
                    enquiries?.map((enquiry, index) => (
                      <InquiryCard key={index} enquiry={enquiry} updateData={fetchEnquiryHandler} />
                    ))
                  }
                </div>
              ) : (
                <div className='text-center'>
                  <h5 className='text-muted py-5'>No Enquiry</h5>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}