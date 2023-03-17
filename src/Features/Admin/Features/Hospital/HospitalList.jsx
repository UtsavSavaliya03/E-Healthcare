import React, { useState, useEffect } from 'react';
import './HospitalList.css';
import { Helmet } from "react-helmet";
import { TextField, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import HospitalCard from './Components/HospitalCard';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import { fetchHospitals } from '../../Services/hospitalServices.jsx';

export default function HospitalList() {

  const token = localStorage.getItem('token') || null;
  const [hospital, setHospital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHospitalHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const hospital = await fetchHospitals(headers);
    setHospital(hospital?.hospital);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchHospitalHandle();
  }, [])

  return (
    <div className='main-hospital-container px-lg-5 py-4'>
      <Helmet>
        <title>Hospital | Health Horizon</title>
      </Helmet>
      <div className='hospital-list-searchbar-container py-3 px-1 mb-3 row m-0'>
        <div className='col-md-6 col-sm-12 mb-md-0'>
          <TextField
            fullWidth
            id="input-with-icon-adornment"
            placeholder='Search . . .'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className='col-md-4 my-3 col-sm-8'>
          <TextField
            fullWidth
            name='department'
            label="Department"
            select
          >
            <MenuItem value='A+'>A+</MenuItem>
            <MenuItem value='A-'>A-</MenuItem>
            <MenuItem value='B+'>B+</MenuItem>
            <MenuItem value='B-'>B-</MenuItem>
          </TextField>
        </div>
        <div className='col-md-2 col-sm-4'>
          <button className='btn-search'>Search</button>
        </div>
      </div>
      <div className='row m-0 p-0'>
        {
          isLoading ? (
            <div className='w-100 d-flex justify-content-center align-items-center my-5 py-5'>
              <Spinner />
            </div>
          ) : (
            <div className='row px-0 m-0 w-100'>
              {
                hospital?.length > 0 ? (
                  hospital?.map((hospital, index) => (
                    <HospitalCard key={index} hospital={hospital} />
                  ))
                ) : (
                  <h4 className='text-center text-muted w-100 py-5'>No Hospital</h4>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}