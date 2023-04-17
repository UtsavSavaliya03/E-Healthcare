import React, { useEffect, useState } from 'react';
import './Inquiry.css';
import { Helmet } from "react-helmet";
import { fetchInquiry } from '../../Services/inquiryServices.jsx';
import InquiryCard from './Components/InquiryCard.jsx';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Backdrop from "@mui/material/Backdrop";
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx'

export default function Inquiry() {

  const token = localStorage.getItem('token') || null;
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const fetchInquiryHandler = async () => {
    setLoading(true);
    const headers = {
      'Authorization': token
    }
    
    const inquiry = await fetchInquiry(headers, alignment);
    setInquiries(inquiry?.data)
    setLoading(false);
  }

  useEffect(() => {
    fetchInquiryHandler();
  }, [alignment])

  const deleteLoaderHandler = (loading) => {
    setIsLoadingDelete(loading);
  }

  const updateDataHandler = (id) => {
    if (id) {
      var updatedInquiry = inquiries.filter((inquiry) => {
        if (inquiry?._id !== id) {
          return inquiry;
        }
      });
      setInquiries(updatedInquiry);
    } else {
      fetchInquiryHandler();
    }
  }

  return (
    <div className='px-5 py-4 inquiry-container'>
      <Helmet>
        <title>Inquiries | Health Horizon</title>
      </Helmet>
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoadingDelete}
      >
        <Spinner />
      </Backdrop>
      <div>
        <div className='inquiry-title ml-1 pb-4 pt-2 d-flex align-items-center'>
          <h4 className='m-0 text-blue'>Inquiries</h4>
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
              inquiries?.length > 0 ? (
                <div>
                  {
                    inquiries?.map((inquiry, index) => (
                      <InquiryCard
                        key={index}
                        inquiry={inquiry}
                        updateData={updateDataHandler}
                        deleteLoaderHandler={deleteLoaderHandler}
                      />
                    ))
                  }
                </div>
              ) : (
                <div className='text-center'>
                  <h5 className='text-muted py-5'>No Inquiry</h5>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}