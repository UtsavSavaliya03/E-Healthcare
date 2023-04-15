import React, { useEffect, useState } from 'react';
import './PatientsList.css';
import PatientCard from './PatientCard';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { fetchTestRequestsByStatus, searchPatients } from '../../../../Laboratory/Services/laboratoryServices.jsx';
import { Spinner } from "../../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddElectrolyteReport from './TestReports/AddElectrolyteReport.jsx';
import AddUrinalysisReport from './TestReports/AddUrinalysisReport.jsx';
import AddBloodGlucoseReport from './TestReports/AddBloodGlucoseReport.jsx';
import AddLipidProfileReport from './TestReports/AddLipidProfileReport.jsx';
import AddCbcReport from './TestReports/AddCbcReport.jsx';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../../Store/globalState';

export default function PatientsList(props) {

  const user = useRecoilValue(userState);
  const token = localStorage.getItem('token') || null;
  const [searchValue, setSearchValue] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [testRequest, setTestRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedPatients, setSearchedPatients] = useState([]);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const handleClosePatient = () => {
    setSelectedReport();
    fetchPatientsHandler(1);
  }

  const searchHandler = async () => {
    if (searchValue.length <= 0) {
      return;
    }
    setIsLoadingBackdrop(true);
    const headers = {
      'Authorization': token
    }

    const patients = await searchPatients((searchValue).toUpperCase(), headers);
    if (patients?.status) {
      setSearchedPatients(patients?.data);
      setIsSearched(true);
      setIsLoadingBackdrop(false);
    }
  }

  const fetchPatientsHandler = async (status) => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }

    const params = {
      laboratory: user?._id,
      status: status
    }

    const patientResponse = await fetchTestRequestsByStatus(params, headers);
    setTestRequest(patientResponse?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPatientsHandler(1);
  }, []);

  const setSelectedReportHandler = (report) => {
    setSelectedReport(report)
  }

  const displayReport = () => {
    switch (selectedReport?.type) {
      case 'Urinalysis':
        return <AddUrinalysisReport report={selectedReport} handleClosePatient={handleClosePatient} />

      case 'Lipid Profile':
        return <AddLipidProfileReport report={selectedReport} handleClosePatient={handleClosePatient} />

      case 'Electrolyte':
        return <AddElectrolyteReport report={selectedReport} handleClosePatient={handleClosePatient} />

      case 'Compelete Blood Count':
        return <AddCbcReport report={selectedReport} handleClosePatient={handleClosePatient} />

      case 'Blood Glucose':
        return <AddBloodGlucoseReport report={selectedReport} handleClosePatient={handleClosePatient} />
    }
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
              testRequest?.length > 0 ? (
                <div className='row m-0'>
                  {
                    testRequest?.map((request, index) => (
                      <PatientCard key={index} testRequest={request} selectReport={setSelectedReportHandler} />
                    ))
                  }
                </div>
              ) : (
                <div className='text-center w-100 py-5'>
                  <h5 className='text-muted py-5'>No Test Request</h5>
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
                searchedPatients?.map((request, index) => (
                  <PatientCard key={index} testRequest={request} selectReport={setSelectedReportHandler} />
                ))
              }
            </div>
          ) : (
            <div className='text-center w-100 py-5'>
              <h5 className='text-muted py-5'>No Test Requests</h5>
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
        selectedReport ? (
          <>
            <div className='btn-show-all px-4 pb-3'>
              <IconButton className='mr-1' onClick={() => {
                setSelectedReport(null);
              }}>
                <ArrowBackIcon />
              </IconButton>
              Back
            </div>
            {displayReport()}
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