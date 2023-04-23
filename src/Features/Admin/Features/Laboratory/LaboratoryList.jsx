import React, { useState, useEffect } from 'react';
import './LaboratoryList.css';
import { Helmet } from "react-helmet";
import { TextField, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LaboratoryCard from './Components/LaboratoryCard.jsx';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import { fetchLaboratories, searchLaboratories } from '../../Services/laboratoryServices.jsx';
import Backdrop from "@mui/material/Backdrop";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { searchHospitals } from '../../Services/hospitalServices.jsx';
let State = require('country-state-city').State;
let City = require('country-state-city').City;

export default function LaboratoryList() {

  const States = [{ isoCode: 1, name: 'All' }, ...State.getStatesOfCountry('IN')];
  const [Cities, setCities] = useState([{ name: 'All' }]);
  const token = localStorage.getItem('token') || null;
  const [searchValue, setSearchValue] = useState({ searchText: '', state: 1, city: 'All' });
  const [laboratory, setLaboratory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedLaboratories, setSearchedLaboratories] = useState([]);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    let cities = City.getCitiesOfState('IN', searchValue?.state);
    setCities([{ name: 'All' }, ...cities]);
  }, [searchValue?.state]);


  const onChangeHandler = (event) => {
    setSearchValue({ ...searchValue, [event.target.name]: event.target.value });
  }

  const fetchLaboratoriesHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const Laboratories = await fetchLaboratories(headers);
    setLaboratory(Laboratories?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchLaboratoriesHandle();
  }, []);

  const searchHandler = async () => {
    setIsLoadingBackdrop(true);
    const headers = {
      'Authorization': token
    }

    const params = {
      name: (searchValue?.searchText).trim(),
      state: searchValue?.state === 1 ? null : searchValue?.state,
      city: searchValue?.city === "All" ? null : searchValue?.city
    }

    const laboratories = await searchLaboratories(params, headers);
    if (laboratories?.status) {
      setSearchedLaboratories(laboratories?.data);
      setIsSearched(true);
      setIsLoadingBackdrop(false);
    }
  }

  return (
    <div className='main-hospital-container px-lg-5 py-4'>
      <Helmet>
        <title>Laboratories | Health Horizon</title>
      </Helmet>
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoadingBackdrop}
      >
        <Spinner />
      </Backdrop>
      <div className='hospital-list-searchbar-container py-3 px-1 mb-3 row m-0'>
        <div className='col-md-4 col-sm-12 mb-md-0'>
          <TextField
            autoComplete='off'
            fullWidth
            name='searchText'
            id="input-with-icon-adornment"
            placeholder='Search . . .'
            value={searchValue?.searchText}
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
        <div className='col-md-3 my-3 col-sm-8'>
          <TextField
            fullWidth
            name='state'
            label="State"
            select
            value={searchValue?.state}
            onChange={(event) => onChangeHandler(event)}
          >
            {
              States &&
                (States?.length > 0) ? (
                States?.map((stete, index) => (
                  <MenuItem key={index} value={stete?.isoCode}>{stete?.name}</MenuItem>
                ))
              ) : (
                <p className='text-center m-0'>No State</p>
              )
            }
          </TextField>
        </div>
        <div className='col-md-3 my-3 col-sm-8'>
          <TextField
            fullWidth
            name='city'
            label="City"
            select
            value={searchValue?.city}
            onChange={(event) => onChangeHandler(event)}
          >
            {
              (
                Cities?.length > 0) ? (
                Cities?.map((city, index) => (
                  <MenuItem key={index} value={city?.name}>{city?.name}</MenuItem>
                ))
              ) : (
                <p className='text-center m-0'>No City</p>
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
      <div className='row m-0 p-0'>
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
                      setSearchValue({ searchText: '', state: null, city: null })
                      setIsSearched(false);
                    }}>
                      <ArrowBackIcon />
                    </IconButton>
                  </div>
                  <div className='row px-0 m-0 w-100'>
                    {
                      searchedLaboratories?.length > 0 ? (
                        searchedLaboratories?.map((laboratory, index) => (
                          <LaboratoryCard key={index} laboratory={laboratory} />
                        ))
                      ) : (
                        <h4 className='text-center text-muted w-100 py-5'>No Laboratory</h4>
                      )
                    }
                  </div>
                </>
              ) : (
                <div className='row px-0 m-0 w-100'>
                  {
                    laboratory?.length > 0 ? (
                      laboratory?.map((laboratory, index) => (
                        <LaboratoryCard key={index} laboratory={laboratory} />
                      ))
                    ) : (
                      <h4 className='text-center text-muted w-100 py-5'>No Laboratory</h4>
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