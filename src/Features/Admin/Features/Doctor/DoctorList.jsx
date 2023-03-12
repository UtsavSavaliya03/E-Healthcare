import React, { useEffect, useState } from 'react';
import DoctorCard from './Components/DoctorCard';
import './DoctorList.css';
import { TextField, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import { useCookies } from 'react-cookie';
import { fetchDoctors } from '../../Services/doctorServices.jsx'

export default function DoctorList() {

    const [cookies] = useCookies();
    const token = cookies.token || null;
    const [searchData, setSearchData] = useState({ searchText: '', department: '' });
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDoctorHandle = async () => {
        setIsLoading(true);
        const headers = {
            'Authorization': token
        }
        const doctor = await fetchDoctors(headers);
        setDoctors(doctor?.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchDoctorHandle()
    }, [])

    return (
        <div className='doctor-list-container pt-3 pb-5 px-lg-5 px-3'>
            <div className='doctor-list-searchbar-container py-3 px-1 mb-3 row m-0'>
                <div className='col-md-6 col-sm-12 mb-md-0'>
                    <TextField
                        fullWidth
                        id="input-with-icon-adornment"
                        placeholder='Search . . .'
                        onChange={(e) => setSearchData({ searchText: e.target.value })}
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
                        onChange={(e) => setSearchData({ department: e.target.value })}
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
                        <div className='row p-0'>
                            {
                                doctors?.length > 0 ? (
                                    doctors?.map((doctor, index) => (
                                        <DoctorCard key={index} doctor={doctor} />
                                    ))
                                ) : (
                                    <h4 className='text-center text-muted w-100 p-5'>No Doctors</h4>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}