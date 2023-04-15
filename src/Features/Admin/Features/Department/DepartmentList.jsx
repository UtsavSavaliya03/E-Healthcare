import React, { useEffect, useState } from 'react';
import './DepartmentList.css';
import { Helmet } from "react-helmet";
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DepartmentCard from "../Department/Components/DepartmentCard.jsx";
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import { fetchDepartments } from '../../Services/departmentServices.jsx';
import Backdrop from "@mui/material/Backdrop";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { searchDepartments } from '../../Services/departmentServices.jsx';

export default function DepartmentList() {

  const token = localStorage.getItem('token') || null;
  const [searchValue, setSearchValue] = useState('');
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedDepartments, setSearchedDepartments] = useState([]);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

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
  }, []);

  const searchHandler = async () => {
    setIsLoadingBackdrop(true);
    const headers = {
      'Authorization': token
    }

    const params = {
      name: searchValue.trim(),
  }

    const department = await searchDepartments(params, headers);
    if (department?.status) {
      setSearchedDepartments(department?.data);
      setIsSearched(true);
      setIsLoadingBackdrop(false);
    }
  }

  return (
    <div className='main-department-container px-5 py-4'>
      <Helmet>
        <title>Departments | Health Horizon</title>
      </Helmet>
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoadingBackdrop}
      >
        <Spinner />
      </Backdrop>
      <div className='department-list-searchbar-container py-3 px-1 mb-3 row m-0'>
        <div className='col-md-10 col-sm-12 mb-md-0'>
          <TextField
            autoComplete='off'
            fullWidth
            id="input-with-icon-adornment"
            placeholder='Search . . .'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                searchHandler()
              }
            }}
          />
        </div>
        <div className='col-md-2 col-sm-4'>
          <button
            className='btn-search'
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        {
          isLoading ? (
            <div className='w-100 d-flex justify-content-center align-items-center my-5 py-5'>
              <Spinner />
            </div>
          ) : (
            <>
              {isSearched ? (
                <>
                  <div className='btn-show-all'>
                    <IconButton onClick={() => {
                      setSearchValue('')
                      setIsSearched(false);
                    }}>
                      <ArrowBackIcon />
                    </IconButton>
                  </div>
                  <div className='row px-0 m-0 w-100'>
                    {
                      searchedDepartments?.length > 0 ? (
                        searchedDepartments?.map((department, index) => (
                          <DepartmentCard key={index} department={department} />
                        ))
                      ) : (
                        <h4 className='text-center text-muted w-100 py-5'>No Department</h4>
                      )
                    }
                  </div>
                </>
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
              )}
            </>
          )
        }
      </div>
    </div>
  )
}