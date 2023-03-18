import React, { useEffect, useState } from 'react';
import './DepartmentList.css';
import { Helmet } from "react-helmet";
import { TextField, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DepartmentCard from "../Department/Components/DepartmentCard.jsx";
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import { fetchDepartments } from '../../Services/departmentServices.jsx';

export default function DepartmentList() {

  const token = localStorage.getItem('token') || null;
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDepartmentHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const department = await fetchDepartments(headers);
    setDepartment(department?.department);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDepartmentHandle();
  }, [])

  return (
    <div className='main-department-container px-5 py-4'>
      <Helmet>
        <title>Department | Health Horizon</title>
      </Helmet>
      <div className='department-list-searchbar-container py-3 px-1 mb-3 row m-0'>
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
      <div>
        {
          isLoading ? (
            <div className='w-100 d-flex justify-content-center align-items-center my-5 py-5'>
              <Spinner />
            </div>
          ) : (
            <div className='row p-0 m-0'>
              {
                department?.length > 0 ? (
                  department?.map((department, index) => (
                    <DepartmentCard key={index} department={department} />
                  ))
                ) : (
                  <h4 className='text-center text-muted w-100 py-5'>No Department</h4>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}