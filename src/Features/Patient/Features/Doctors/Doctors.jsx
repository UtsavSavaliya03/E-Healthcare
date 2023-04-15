import React, { useEffect, useState } from 'react';
import DoctorCard from './Components/DoctorCard';
import './Doctors.css';
import { TextField, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import { fetchDoctors, searchDoctor } from '../../Services/doctorServices.jsx';
import Backdrop from "@mui/material/Backdrop";
import { fetchActiveDepartments } from '../../Services/departmentServices.jsx';
import { Helmet } from "react-helmet";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Doctors() {

    const token = localStorage.getItem('token') || null;
    const [searchValue, setSearchValue] = useState({ searchText: '', department: 1 });
    const [doctors, setDoctors] = useState([]);
    const [searchedDoctors, setSearchedDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
    const [departments, setDepartments] = useState([]);

    const fetchDoctorHandle = async () => {
        setIsLoading(true);
        const headers = {
            'Authorization': token
        }
        const doctor = await fetchDoctors(headers);
        setDoctors(doctor?.data);
        setIsLoading(false);
    }

    const fetchDepartmentsHandler = async () => {
        const headers = {
            'Authorization': token
        }

        const departments = await fetchActiveDepartments(headers);
        setDepartments([{ _id: 1, name: 'All' }, ...departments?.department]);
    }

    const onChangeHandler = (event) => {
        setSearchValue({ ...searchValue, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        fetchDoctorHandle();
        fetchDepartmentsHandler();
    }, []);

    const searchHandler = async () => {
        setIsLoadingBackdrop(true);
        const headers = {
            'Authorization': token
        }

        const params = {
            fName : (searchValue?.searchText).charAt(0).toUpperCase() + (searchValue?.searchText).slice(1),
            department: searchValue?.department == 1 ? '' : searchValue?.department
        }

        const doctors = await searchDoctor(params, headers);
        if (doctors?.status) {
            setSearchedDoctors(doctors?.data);
            setIsSearched(true);
            setIsLoadingBackdrop(false);
        }
    }

    const updateDataHandler = (id) => {
        var updatedDoctors = doctors.filter((doctor) => {
            if (doctor?._id !== id) {
                return doctor;
            }
        });
        setDoctors(updatedDoctors);
    }

    const deleteLoaderHandler = (loading) => {
        setIsLoadingBackdrop(loading);
    }

    return (
        <>
            <Helmet>
                <title>Doctors | Health Horizon</title>
            </Helmet>
            <Backdrop
                sx={{ zIndex: 1 }}
                open={isLoadingBackdrop}
            >
                <Spinner />
            </Backdrop>
            <div className='doctor-list-container pt-3 pb-5 px-lg-5 px-3'>
                <div className='doctor-list-searchbar-container py-3 px-1 mb-3 row m-0'>
                    <div className='col-md-6 col-sm-12 mb-md-0'>
                        <TextField
                            fullWidth
                            name='searchText'
                            value={searchValue?.searchText}
                            autoComplete='off'
                            id="input-with-icon-adornment"
                            placeholder='Search . . .'
                            onChange={(event) => onChangeHandler(event)}
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
                    <div className='col-md-4 my-3 col-sm-8'>
                        <TextField
                            fullWidth
                            name='department'
                            label="Department"
                            select
                            value={searchValue.department}
                            onChange={(event) => onChangeHandler(event, true)}
                        >
                            {
                                departments &&
                                    (departments?.length > 0) ? (
                                    departments?.map((department, index) => {
                                        return (
                                            <MenuItem key={index} value={department?._id}>{department?.name}</MenuItem>
                                        )
                                    })
                                ) : (
                                    <p className='text-center m-0'>No Departments</p>
                                )
                            }
                        </TextField>
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
                                                setSearchValue({ searchText: '', department: 1 })
                                                setIsSearched(false);
                                            }}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </div>
                                        <div className='row p-0'>
                                            {
                                                searchedDoctors?.length > 0 ? (
                                                    searchedDoctors?.map((doctor, index) => (
                                                        <DoctorCard
                                                            key={index}
                                                            doctor={doctor}
                                                            updateData={updateDataHandler}
                                                            deleteLoaderHandler={deleteLoaderHandler}
                                                        />
                                                    ))
                                                ) : (
                                                    <h4 className='text-center text-muted w-100 p-5'>No Doctors</h4>
                                                )
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <div className='row p-0'>
                                        {
                                            doctors?.length > 0 ? (
                                                doctors?.map((doctor, index) => (
                                                    <DoctorCard
                                                        key={index}
                                                        doctor={doctor}
                                                        updateData={updateDataHandler}
                                                        deleteLoaderHandler={deleteLoaderHandler}
                                                    />
                                                ))
                                            ) : (
                                                <h4 className='text-center text-muted w-100 p-5'>No Doctors</h4>
                                            )
                                        }
                                    </div>
                                )}
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}