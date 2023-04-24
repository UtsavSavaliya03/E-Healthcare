import React, { useEffect, useState } from "react";
import "./BookAppointment.css";
import { TextField, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { fetchActiveDepartments } from "../../../Admin/Services/departmentServices.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, selectedDoctorStateAtom } from '../../../../Store/globalState.jsx';
import DoctorCard from "./Components/DoctorCard";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';
import { Divider } from "@mui/material";
import { fetchDoctors, searchDoctor } from '../../Services/doctorServices.jsx';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx'
import Avatar from "react-avatar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Backdrop from "@mui/material/Backdrop";
import { AppointmentTimeData } from '../../../../Constant/OurFacilities/Appointment/AppointmentTime.jsx';
import moment from "moment/moment";
import { bookAppointment, fetchNonEmptyAppointmentSlots } from '../../Services/appointmentServices.jsx';
import { useNavigate } from "react-router-dom";
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';
import { Helmet } from "react-helmet";

let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function BookAppointment() {

  const currentDate = new Date();
  const previousDisableDates = currentDate.setDate(currentDate.getDate() - 1);
  const futureDisableDates = currentDate.setDate(currentDate.getDate() + 30);
  const user = useRecoilValue(userState);
  const notification = new Notificaion;
  const navigate = useNavigate();
  const States = [{ isoCode: 1, name: 'All' }, ...State.getStatesOfCountry('IN')];
  const [Cities, setCities] = useState([{ name: 'All' }]);
  const [searchValue, setSearchValue] = useState({ searchText: '', state: 1, city: 'All', department: 1 });
  const [departments, setDepartments] = useState([]);
  const token = localStorage.getItem("token") || null;
  const [doctors, setDoctors] = useState([]);
  const [searchedDoctors, setSearchedDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useRecoilState(selectedDoctorStateAtom);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [appoinmentDate, setAppointmentDate] = useState(new Date());
  const [appoinmentTime, setAppointmentTime] = useState('');
  const [appoinmentDescription, setAppoinmentDescription] = useState('');
  const [timeSlots, setTimeSlots] = useState(AppointmentTimeData);
  const [nonEmptySlot, setNonEmptySlot] = useState([]);

  useEffect(() => {
    let cities = City.getCitiesOfState('IN', searchValue?.state);
    setCities([{ name: 'All' }, ...cities]);
  }, [searchValue?.state]);

  const setDoctorHandler = (doctor) => {
    setSelectedDoctor(doctor);
  }

  const onChangeHandler = (event) => {
    setSearchValue({ ...searchValue, [event.target.name]: event.target.value });
  }

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
    setIsLoading(true);
    const headers = {
      'Authorization': token,
    };

    const departments = await fetchActiveDepartments(headers);
    setDepartments([{ _id: 1, name: 'All' }, ...departments?.department]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctorHandle();
    fetchDepartmentsHandler();

    return (() => {
      setSelectedDoctor(null);
      setNonEmptySlot([]);
      setTimeSlots(AppointmentTimeData);
    })
  }, []);

  const fetchNonEmptyAppointmentSlotsHandler = async (appoinmentDate) => {
    const token = localStorage.getItem("token") || null

    const headers = {
      "Authorization": token
    }

    const params = {
      date: moment(appoinmentDate).format('YYYY/MM/DD'),
      id: selectedDoctor?._id
    }

    if (selectedDoctor) {
      const appointmentsResponse = await fetchNonEmptyAppointmentSlots(params, headers)
      if (appointmentsResponse?.status) {
        setNonEmptySlot(appointmentsResponse?.data);
        setTimeSlots(AppointmentTimeData);
      }
    }
  }

  useEffect(() => {
    fetchNonEmptyAppointmentSlotsHandler(appoinmentDate)
  }, [appoinmentDate, selectedDoctor])

  const timeHandler = (hour, hourLabel) => {
    let today = new Date();
    if (moment(appoinmentDate).format('L') == moment(new Date()).format('L')) {
      let currentHour = today.setHours(today.getHours());
      let selectedHour = today.setHours(hour - 1);

      if (selectedHour < currentHour) {
        return true;
      } else {
        var status;
        var counter = 0;

        for (let index = 0; index < nonEmptySlot?.length; index++) {
          const element = nonEmptySlot[index];

          if (element?.appointmentTime.toString() == hourLabel.toString()) {
            status = true;
          }

          if (++counter === nonEmptySlot?.length) {
            return status;
          }
        }
      }
    } else {
      var status;
      var counter = 0;

      for (let index = 0; index < nonEmptySlot?.length; index++) {
        const element = nonEmptySlot[index];

        if (element?.appointmentTime.toString() == hourLabel.toString()) {
          status = true;
        }

        if (++counter === nonEmptySlot?.length) {
          return status;
        }
      }
    }
  }

  const searchDoctorHandler = async () => {
    setSelectedDoctor();
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }

    const params = {
      fName: (searchValue?.searchText).charAt(0).toUpperCase() + (searchValue?.searchText).slice(1),
      department: searchValue?.department == 1 ? '' : searchValue?.department,
      state: searchValue?.state == 1 ? '' : searchValue?.state,
      city: searchValue?.city == 'All' ? '' : searchValue?.city,
    }

    const doctors = await searchDoctor(params, headers);
    if (doctors?.status) {
      setSearchedDoctors(doctors?.data);
      setIsSearched(true);
      setIsLoading(false);
    }
  }

  const bookAppointmentHandler = async () => {
    setIsLoadingBackdrop(true);
    const headers = {
      'Authorization': token
    }
    const params = {
      appoinmentId: selectedDoctor?.appointmentId,
      patient: user._id,
      doctor: selectedDoctor._id,
      appointmentDate: moment(appoinmentDate).format('YYYY/MM/DD'),
      appointmentTime: appoinmentTime,
      description: appoinmentDescription
    }

    const appoinmentResponse = await bookAppointment(params, headers);

    if (appoinmentResponse?.status) {
      setIsLoadingBackdrop(false);
      navigate('/patient/my-appointments');
    }
    notification.notify(appoinmentResponse?.status, appoinmentResponse?.message);
    setIsLoadingBackdrop(false);
  }

  const displayDoctor = () => {
    return (
      <div className="w-100">
        {
          isLoading ? (
            <div className="pt-5 mt-5 d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            <div>
              {
                isSearched ? (
                  <>
                    <div className='btn-show-all pb-3'>
                      <IconButton onClick={() => {
                        setSearchValue({ searchText: '', state: 1, city: 'All', department: 1 })
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
                              setDoctor={setDoctorHandler}
                            />
                          ))
                        ) : (
                          <h4 className='text-center text-muted w-100 p-5'>No Doctors</h4>
                        )
                      }
                    </div>
                  </>
                ) : (
                  <>
                    {
                      doctors?.length > 0 ? (
                        <div className="row m-0 ">
                          {
                            doctors?.map((doctor, index) => (
                              <DoctorCard key={index} doctor={doctor} setDoctor={setDoctorHandler} />
                            ))
                          }
                        </div>
                      ) : (
                        <div className="text-center text-muted pt-5">
                          <h5>No Doctors</h5>
                        </div>
                      )
                    }
                  </>
                )}
            </div>
          )
        }
      </div >
    )
  }

  const selectDateHandler = (e) => {
    setAppointmentDate(e);
    setAppointmentTime('');
  }

  return (
    <>
      <Helmet>
        <title>Book an appoinment | Health Horizon</title>
      </Helmet>
      <div className="book-appointment-container row m-0">
        <div className="book-appointment-header py-5 mx-auto col-12">
          <p className="h1 font-weight-bold text-blue text-center">
            Search Doctor, Make an Appointment
          </p>
          <p className="h5 mt-3 font-weight-bold text-secondary text-center">
            Discover the best doctors & hospitals in the city nearest to
            you.
          </p>
          <hr className="w-50" />
          <p className="h5 mt-3 font-weight-bold text-secondary text-center">
            Book an appoinment as a <span className="text-blue">{`${user?.fName} ${user?.lName} (${user?.patientId || '-'})`}</span>
          </p>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-12 py-5 book-appointment-search-form-container d-flex justify-content-center">
          <div>
            <TextField
              autoComplete="off"
              className="w-100"
              id="input-with-icon-adornment"
              placeholder="Search. . ."
              name='searchText'
              value={searchValue?.searchText}
              onChange={onChangeHandler}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchDoctorHandler()
                }
              }}
            />
            <TextField
              className="w-100 mt-4"
              name="state"
              label="State"
              select
              value={searchValue?.state}
              onChange={onChangeHandler}
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
            <TextField
              className="w-100 mt-4"
              name="city"
              label="City"
              select
              value={searchValue?.city}
              onChange={onChangeHandler}
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
            <TextField
              className="w-100 mt-4"
              name="department"
              label="Department"
              select
              value={searchValue?.department}
              onChange={onChangeHandler}
            >
              {departments && departments?.length > 0 ? (
                departments?.map((department, index) => {
                  return (
                    <MenuItem
                      className="w-100"
                      key={index}
                      value={department._id}
                    >
                      {department?.name}
                    </MenuItem>
                  );
                })
              ) : (
                <p className="text-center m-0">No Departments</p>
              )}
            </TextField>
            <div className="mt-4 text-right">
              <button className="btn-search" onClick={searchDoctorHandler}>Apply</button>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-12 row m-0 mt-md-5">
          {
            selectedDoctor ? (
              <div className="col-12 mb-4">
                <div className="book-appintment-card w-100">
                  <div className="w-100">
                    <div className="book-appintment-card-body">
                      <div className="d-flex align-items-center row m-0">
                        <div className="d-flex justify-content-start align-items-center px-4 py-4 col-lg-6">
                          <div className="pl-3">
                            <Avatar className="user-avatar" round name={`${selectedDoctor?.fName} ${selectedDoctor?.lName}`} src={selectedDoctor?.profileImg} />
                          </div>
                          <div className="pl-4">
                            <h4 className="m-0 dropdown-title break-title-1 text-blue">
                              {`Dr. ${selectedDoctor?.fName} ${selectedDoctor?.lName}`}
                            </h4>
                            <p className="m-0 h5 text-muted break-title-1">{selectedDoctor?.department?.name}</p>
                          </div>
                        </div>
                        <div className="d-flex flex-column col-lg-5 px-4">
                          <span className="subheadings h4 m-0 text-blue break-line-1">
                            {selectedDoctor?.hospital?.name}
                          </span>
                          <span className="text-muted h5 m-0 break-line-1">
                            {selectedDoctor?.hospital?.city?.name}, {selectedDoctor?.hospital?.state?.name}.
                          </span>
                        </div>
                        <div className="col-lg-1 px-4">
                          <IconButton className="btn-close-appointment" onClick={() => setSelectedDoctor()} color="primary">
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </div>
                      <Divider variant="middle" className="mt-0 pt-0" />
                      <div className="d-flex justify-content-between row m-0 p-4">
                        <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center">
                          <Calendar
                            onChange={selectDateHandler}
                            value={appoinmentDate}
                            tileDisabled={({ date }) => date < previousDisableDates || date > futureDisableDates || date.getDay('Sunday') === 0}
                          />
                        </div>
                        <div className="col-lg-8 col-md-12 row m-0 d-flex justify-content-center align-items-center book-appointment-time-button-container mt-4 mt-lg-0">
                          {
                            timeSlots?.map((time, index) => (
                              <div
                                key={index}
                                className="radioPad"
                              >
                                <div>
                                  <label
                                    className={`${(appoinmentTime == time?.label) ? 'radioPad__wrapper radioPad__wrapper--selected' : 'radioPad__wrapper'} ${timeHandler(time?.value, time?.label) ? 'radioPad__wrapper--disable' : ''}`}
                                  >
                                    <input
                                      className="radioPad__radio"
                                      type="radio"
                                      name="time"
                                      id={time?.label}
                                      value={appoinmentTime}
                                      disabled={timeHandler(time?.value, time?.label)}
                                      onChange={() => setAppointmentTime(time?.label)}
                                    />
                                    {time?.label}
                                  </label>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                        <div className="w-100 px-3 pt-5">
                          <TextField
                            multiline
                            rows={3}
                            className='w-100 description-input'
                            name='description'
                            label="Appointment Description"
                            value={appoinmentDescription}
                            onChange={(e) => setAppoinmentDescription(e.target.value)}
                          />
                        </div>
                        <div className="w-100 pr-3 pt-4 pb-3 text-right">
                          <button
                            className="btn-proceed"
                            onClick={bookAppointmentHandler}
                            disabled={appoinmentTime == '' ? true : false}
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              displayDoctor()
            )
          }
        </div>
        <Backdrop
          sx={{ zIndex: 1 }}
          open={isLoadingBackdrop}
        >
          <Spinner />
        </Backdrop>
      </div>
    </>
  );
}
