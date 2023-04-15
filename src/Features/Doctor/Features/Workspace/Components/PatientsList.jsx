import React, { useEffect, useState } from 'react';
import './PatientsList.css';
import PatientCard from './PatientCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { fetchPatients, searchPatients } from '../../../Services/patientsServices.jsx';
import { Spinner } from "../../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneratePrescription from './GeneratePrescription';

export default function PatientsList(props) {

  const token = localStorage.getItem('token') || null;
  const [searchValue, setSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedPatients, setSearchedPatients] = useState([]);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  
  const handleClosePatient = (e, prescriptions) => {
    props.handleTabChange(e, prescriptions);
  }

  const searchHandler = async () => {
    if (searchValue.length <= 0) {
      return;
    }
    setIsLoadingBackdrop(true);
    const headers = {
      'Authorization': token
    }

    const patients = await searchPatients(searchValue, headers);
    if (patients?.status) {
      setSearchedPatients(patients?.data);
      setIsSearched(true);
      setIsLoadingBackdrop(false);
    }
  }

  const fetchPatientsHandler = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const patientResponse = await fetchPatients(headers);
    setPatients(patientResponse?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPatientsHandler();
  }, []);

  const setSelectedPatientHandler = (patient) => {
    setSelectedPatient(patient)
  }

  const renderPatients = () => {
    return (
      <div>
        {isLoading ? (
          <div className='d-flex justify-content-center align-items-center py-5'>
            <Spinner />
          </div>
        ) : (
          <div>
            {
              patients.length > 0 ? (
                <div className='row m-0'>
                  {
                    patients?.map((patient, index) => (
                      <PatientCard key={index} patient={patient} selectPatient={setSelectedPatientHandler} />
                    ))
                  }
                </div>
              ) : (
                <div className='text-center w-100 py-5'>
                  <h5 className='text-muted py-5'>No Patients</h5>
                </div>
              )
            }
          </div>
        )}
      </div>
    )
  }

  const renderSearchedPatients = () => {
    return (
      <div>
        {
          searchedPatients.length > 0 ? (
            <div className='row m-0'>
              {
                searchedPatients?.map((patient, index) => (
                  <PatientCard key={index} patient={patient} selectPatient={setSelectedPatientHandler} />
                ))
              }
            </div>
          ) : (
            <div className='text-center w-100 py-5'>
              <h5 className='text-muted py-5'>No Patients</h5>
            </div>
          )
        }
      </div>
    )
  }

  const renderPatientsComponent = () => {
    return (
      <div className='patient-list-container'>
        <div className="header row m-0 px-2 pb-3">
          <div className="col-lg-6 col-md-4 d-flex align-items-center">
            {
              isSearched &&
              <div className='btn-show-all'>
                <IconButton className='mr-1' onClick={() => {
                  setSearchValue('')
                  setIsSearched(false);
                }}>
                  <ArrowBackIcon />
                </IconButton>
                Show All
              </div>
            }
          </div>
          <div className="col-lg-4 col-md-6">
            <TextField
              autoComplete='off'
              fullWidth
              id="input-with-icon-adornment"
              placeholder='Search by patient id . . .'
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className='patient-id-input'
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
          <div className='col-md-2'>
            <button
              className='btn-search'
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
        </div>
        <hr />
        <div className='px-2'>
          {
            isSearched ? (
              renderSearchedPatients()
            ) : (
              renderPatients()
            )
          }
        </div>
      </div>
    )
  }

  return (
    <div className='patients-list-container'>
      {
        selectedPatient ? (
          <>
            <div className='btn-show-all px-4 pb-3'>
              <IconButton className='mr-1' onClick={() => {
                setSelectedPatient(null);
              }}>
                <ArrowBackIcon />
              </IconButton>
              Back
            </div>
            <GeneratePrescription patient={selectedPatient} handleClosePatient={handleClosePatient} />
          </>
        ) : (
          renderPatientsComponent()
        )
      }
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoadingBackdrop}
      >
        <Spinner />
      </Backdrop>
    </div>
  )
}