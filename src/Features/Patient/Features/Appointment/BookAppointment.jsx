import React, { useEffect, useState } from "react";
import "./BookAppointment.css";
import { TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { fetchDepartments } from "../../../Admin/Services/departmentServices.jsx";
import Avatar from "@mui/material/Avatar";
import DoctorCard from "./Components/DoctorCard";
import Divider from "@mui/material/Divider";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';

let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function BookAppointment() {
  const States = State.getStatesOfCountry("IN");
  const [departments, setDepartments] = useState([]);
  const token = localStorage.getItem("token") || null;

  const initialValues = {
    state: null,
    city: null,
    department: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
  });

  const fetchDepartmentsHandler = async () => {
    const headers = {
      Authorization: token,
    };

    const departments = await fetchDepartments(headers);
    setDepartments(departments?.department);
  };

  useEffect(() => {
    fetchDepartmentsHandler();
  }, []);

  const [value, onChange] = useState(new Date());
  return (
    <div className="book-appointment-container row m-0">
      <div className="book-appointment-header py-5 mx-auto col-12">
        <p className="h1 font-weight-bold text-dark text-center">
          Search Doctor, Make an Appointment
        </p>
        <p className="h5 mt-3 font-weight-bold text-secondary text-center">
          Discover the best doctors, clinic & hospital in the city nearest to
          you.
        </p>
        <div className="mt-5">
          <form
            action=""
            className="row m-0 d-flex justify-content-center"
            method="post"
            autoComplete="off"
          >
            <TextField
              name="Name"
              label="Name"
              className="col-lg-3 col-md-5"
              //   value={formik.values.fName}
              //   error={formik.touched.fName && Boolean(formik.errors.fName)}
              //   onChange={formik.handleChange}
            />
            <TextField
              name="Email"
              label="Email"
              className="col-lg-3 col-md-5 ml-md-3 mt-md-0 mt-3"
              //   value={formik.values.fName}
              //   error={formik.touched.fName && Boolean(formik.errors.fName)}
              //   onChange={formik.handleChange}
            />
          </form>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-12 py-5 book-appointment-search-form-container d-flex justify-content-center">
        <form action="" className="w-lg-75 w-md-100 px-md-3">
          <TextField
            className="w-100"
            id="input-with-icon-adornment"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="w-100 mt-4"
            name="state"
            label="State"
            select
            value={formik.values.state}
            error={formik.touched.state && Boolean(formik.errors.state)}
            onChange={formik.handleChange}
          >
            {States && States?.length > 0 ? (
              States?.map((stete, index) => (
                <MenuItem className="w-100" key={index} value={stete}>
                  {stete?.name}
                </MenuItem>
              ))
            ) : (
              <p className="text-center m-0">No State</p>
            )}
          </TextField>
          <TextField
            className="w-100 mt-4"
            name="city"
            label="City"
            select
            value={formik.values.city}
            error={formik.touched.city && Boolean(formik.errors.city)}
            onChange={formik.handleChange}
          >
            {formik.values.state &&
            City.getCitiesOfState("IN", formik.values.state?.isoCode)?.length >
              0 ? (
              City.getCitiesOfState("IN", formik.values.state?.isoCode)?.map(
                (city, index) => (
                  <MenuItem className="w-100" key={index} value={city}>
                    {city?.name}
                  </MenuItem>
                )
              )
            ) : (
              <p className="text-center m-0">No City</p>
            )}
          </TextField>
          <TextField
            className="w-100 mt-4"
            name="department"
            label="Department"
            select
            value={formik.values.department}
            error={
              formik.touched.department && Boolean(formik.errors.department)
            }
            onChange={formik.handleChange}
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
        </form>
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12 row m-0 mt-md-5">
        {/* <DoctorCard /> */}
        <div className="col-12 mb-4">
          <div className="book-appintment-card w-100">
            <div className="w-100">
              <div className="book-appintment-card-body">
                <div className="d-flex align-items-center row m-0">
                  <div className="d-flex justify-content-start align-items-center px-4 py-4 col-lg-6">
                    <div className="pl-3">
                      <Avatar
                        size="100"
                        round={true}
                        alt="Nimish"
                        sx={{ width: 80, height: 80 }}
                      />
                    </div>
                    <div className="pl-4">
                      <h4 className="m-0 dropdown-title break-title-1 text-primary">
                        Dr. Minish Patel
                      </h4>
                      <p className="m-0 h5 text-muted break-title-1">Dentist</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column col-lg-5 px-4">
                    <span className="heading d-block h5 m-0 text-muted">
                      Hospital
                    </span>
                    <span className="subheadings h4 m-0 text-primary">
                      Texas Hospital
                    </span>
                  </div>
                  <div className="col-lg-1 px-4">
                    <IconButton className="btn-close-appointment" color="primary">
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
                <Divider variant="middle" className="mt-0 pt-0" />
                <div className="d-flex justify-content-between row m-0 p-4">
                  <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center">
                  <Calendar onChange={onChange} value={value} />
                  </div>
                  <div className="col-lg-8 col-md-12 row m-0 d-flex justify-content-center align-items-center book-appointment-time-button-container mt-4 mt-lg-0">
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button
                        type="button"
                        className="btn btn-primary px-lg-5 mx-auto"
                      >
                        09:00 am
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        10:00 am
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        11:00 am
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        12:00 am
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        02:00 pm
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        03:00 pm
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        04:00 pm
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button type="button" className="btn btn-primary px-lg-5">
                        05:00 pm
                      </button>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
                      <button
                        type="button"
                        className="btn btn-primary px-lg-5 mx-auto"
                      >
                        06:00 pm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
