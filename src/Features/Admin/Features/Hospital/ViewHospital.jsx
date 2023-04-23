import React, { useEffect } from "react";
import "./ViewHospital.css";
import HospitalIcon from "../../../../Assets/Icons/Hospital-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchHospitalById, deleteHospital } from "../../Services/hospitalServices.jsx";
import { useState } from "react";
import Avatar from "react-avatar";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import { IconButton } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";
import { TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '../../../../Components/Common/Alert/SweetAlert.jsx';
import Backdrop from "@mui/material/Backdrop";
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';
import { updateHospital } from '../../Services/hospitalServices.jsx';
import { Helmet } from "react-helmet";
let State = require('country-state-city').State;
let City = require('country-state-city').City;

export default function ViewHospital() {

  const States = State.getStatesOfCountry('IN');
  const alert = new Alert();
  const location = useLocation();
  const notification = new Notificaion;
  const navigate = useNavigate();
  const pathArray = location.pathname.split("/");
  const token = localStorage.getItem("token") || null;
  const hospitalId = atob(pathArray[3]) || null;
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  const initialValues = {
    name: hospitals?.name,
    email: hospitals?.email,
    mobileNo: hospitals?.mobileNo,
    shortBio: hospitals?.shortBio,
    addressLine: hospitals?.addressLine,
    state: hospitals?.state?.isoCode,
    city: hospitals?.city?.name,
  };

  const DoctorSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(' '),
    email: Yup.string()
      .email('Invalid email address.')
      .trim()
      .required(' '),
    mobileNo: Yup.string()
      .typeError("Invalid contact number")
      .trim()
      .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid phone number')
      .required(' '),
    shortBio: Yup.string()
      .required(' '),
    addressLine: Yup.string()
      .required(' '),
    state: Yup.string()
      .required(' '),
    city: Yup.string()
      .required(' '),
  })

  const submitHandler = async (hospitalCredentials) => {

    setIsLoading(true);
    const state = State.getStateByCodeAndCountry(hospitalCredentials?.state, 'IN') || {};
    let cityObj = {};
    const allCities = City.getCitiesOfState('IN', state?.isoCode);

    allCities?.filter((city) => {
      if (city?.name == hospitalCredentials?.city) {
        cityObj = city;
      }
    });

    const params = {
      name: hospitalCredentials?.name,
      email: hospitalCredentials?.email,
      mobileNo: hospitalCredentials?.mobileNo.toString(),
      shortBio: hospitalCredentials?.shortBio,
      addressLine: hospitalCredentials?.addressLine,
      state: state,
      city: cityObj,
    }

    const headers = {
      'Authorization': token
    }

    const hospital = await updateHospital(hospitalId, params, headers);
    notification.notify(hospital?.status, hospital?.message);
    if (hospital?.status) {
      setEnableEdit(false);
      fetchHospitalHandler();
    }
    setIsLoading(false);
  }

  const fetchHospitalHandler = async () => {
    setIsLoading(true);

    const headers = {
      'Authorization': token,
    };

    const hospitals = await fetchHospitalById(hospitalId, headers);
    setHospitals(hospitals.data?.hospital);
    setDoctors(hospitals.data?.doctors);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHospitalHandler();
  }, []);

  const deleteHandler = async () => {
    setIsDeleteLoading(true);
    const headers = {
      'Authorization': token
    }
    const hospitalResponse = await deleteHospital(hospitalId, headers);
    if (hospitalResponse?.status) {
      alert.alert('success', 'Done!', 'Deleted Successfully!');
      navigate('/main/hospital-list');
    } else {
      notification.notify(hospitalResponse?.status, hospitalResponse?.message);
    }
    setIsDeleteLoading(false);
  }

  const openDeletePopup = () => {
    alert.confirmBox('Are you sure?', "You won't be able to revert this!", { deleteHandler })
  }

  const avatarCard = (doctor, index) => {
    return (
      <div className="col-lg-4 col-md-3 col-12 my-3 doctor-detail-box d-flex" key={index}>
        <div className="dpt-doctor-img-container">
          <Avatar
            src={doctor?.profileImg}
            name={`${doctor?.fName} ${doctor?.lName}`}
            round={true}
            size={55}
          />
        </div>
        <div className="dpt-doctor-info ml-2">
          <h5 className="font-weight-bold">{`${doctor?.fName} ${doctor?.lName}`}</h5>
          <h6>{doctor?.email}</h6>
        </div>
      </div>
    )
  }

  const UpdateHospitalForm = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: DoctorSchema,
      onSubmit: (values) => {
        submitHandler(values);
      },
    });

    return (
      <div className='add-hospital-card fade-in pb-4 mb-5'>
        <div className='add-doctore-header px-0 d-flex justify-content-between align-items-center'>
          <h3 className='m-0 text-blue p-4'>Update Hospital</h3>
          <div>
            <IconButton
              onClick={() => setEnableEdit(false)}
              className='mr-4'
            >
              <ClearIcon />
            </IconButton>
          </div>
        </div>
        <hr className='m-0' />
        <div className='body-title py-3 px-4'>
          <h5>About</h5>
          <div className='horizontal-bar'></div>
        </div>
        <div>
          <form className='login-form' onSubmit={formik.handleSubmit} autoComplete="off">
            <div className='row px-4 my-md-1'>
              <div className='col-sm-6 my-3 my-md-0'>
                <TextField
                  className='w-100'
                  name='name'
                  label="Name"
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  onChange={formik.handleChange}
                />
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.name) ? (formik.errors.name) : null}
                </div>
              </div>
              <div className='col-sm-3 my-3 my-md-0'>
                <TextField
                  className='w-100'
                  name='email'
                  label="Email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                />
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.email) ? (formik.errors.email) : null}
                </div>
              </div>
              <div className='col-sm-3 my-3 my-md-0'>
                <TextField
                  className='w-100'
                  type='number'
                  name='mobileNo'
                  label="Contact Number"
                  value={formik.values.mobileNo}
                  error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                  onChange={formik.handleChange}
                />
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.mobileNo) ? (formik.errors.mobileNo) : null}
                </div>
              </div>
            </div>

            <div className='row px-4 my-md-1'>
              <div className='col-sm-12'>
                <TextField
                  multiline
                  rows={3}
                  className='w-100'
                  name='shortBio'
                  label="Short Biography"
                  value={formik.values.shortBio}
                  error={formik.touched.shortBio && Boolean(formik.errors.shortBio)}
                  onChange={formik.handleChange}
                />
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.shortBio) ? (formik.errors.shortBio) : null}
                </div>
              </div>
            </div>

            <hr className='mx-3' />
            <div className='body-title py-3 px-4'>
              <h5>Contact Information</h5>
              <div className='horizontal-bar'></div>
            </div>
            <div className='row px-4 my-md-1 my-3'>
              <div className='col-sm-6 my-3 my-md-0'>
                <TextField
                  className='w-100'
                  name='addressLine'
                  label="Address Line"
                  value={formik.values.addressLine}
                  error={formik.touched.addressLine && Boolean(formik.errors.addressLine)}
                  onChange={formik.handleChange}
                />
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.addressLine) ? (formik.errors.addressLine) : null}
                </div>
              </div>
              <div className='col-sm-3 my-3 my-md-0'>
                <TextField
                  className='w-100'
                  name='state'
                  label="State"
                  select
                  value={formik.values.state}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  onChange={formik.handleChange}
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
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.state) ? (formik.errors.state) : null}
                </div>
              </div>
              <div className='col-sm-3 my-3 my-md-0'>
                <TextField
                  className='w-100'
                  name='city'
                  label="City"
                  select
                  value={formik.values.city}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  onChange={formik.handleChange}
                >
                  {City.getCitiesOfState("IN", formik.values.state) ? (
                    City.getCitiesOfState("IN", formik.values.state)?.map((city, index) => (
                      <MenuItem key={index} value={city?.name}>
                        {city?.name}
                      </MenuItem>
                    ))
                  ) : (
                    <p className="text-center m-0">No City</p>
                  )}
                </TextField>
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.city) ? (formik.errors.city) : null}
                </div>
              </div>
            </div>

            <hr className='mx-3 mb-4' />
            <div className='w-100 text-right px-5'>
              <button className='btn-create-doctor' type='submit'>Update</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 view-hospital-container">
      <Helmet>
        <title>{hospitals?.name || 'Hospital'} | Health Horizon</title>
      </Helmet>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          {
            enableEdit ? (
              <UpdateHospitalForm />
            ) : (
              <div className="fade-in row m-0 view-hospital-card mb-5">
                <div className="col-12 text-center pt-5 pb-3">
                  <div className="d-flex align-items-center justify-content-center pl-2">
                    <h1 className="text-blue text-center font-weight-bold ml-4 view-hospital-title my-0">
                      Hospital Profile
                    </h1>
                    <div className="hospital-action-btn-container ml-auto">
                      <IconButton
                        className='m-2 btn-edit-hospital'
                        onClick={() => setEnableEdit(true)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className='m-2 btn-delete-hospital'
                        onClick={openDeletePopup}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <hr className="mt-5" />
                </div>
                <div className="col-lg-3 col-md-6 p-md-5">
                  <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
                    Details
                  </h3>
                  <p className="font-weight-bold h5">Contact No :</p>
                  <p className="h5">+91 {hospitals?.mobileNo}</p>
                  <p className="font-weight-bold h5 mt-md-4">Email :</p>
                  <p className="h5">{hospitals?.email}</p>
                </div>
                <div className="col-lg-5 col-md-6 p-md-5 mt-4 mt-md-0">
                  <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
                    About Us
                  </h3>
                  <p className="h5">{hospitals?.shortBio}</p>
                </div>
                <div className="col-lg-4 col-md-12 p-md-5 py-5 py-md-0 view-hospital-profile-container text-light d-flex justify-content-center align-items-center flex-column">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <img
                      src={HospitalIcon}
                      alt="Hospital Icon"
                      className="hospital-icon"
                    />
                  </div>
                  <div>
                    <h2 className="font-weight-bold mb-5 text-center">
                      {hospitals.name}
                    </h2>
                    <p className="font-weight-bold h5">Address Line :</p>
                    <p className="h5">{hospitals?.addressLine}</p>
                    <p className="font-weight-bold h5 mt-4">City :</p>
                    <p className="h5">{hospitals?.city?.name}</p>
                    <p className="font-weight-bold h5 mt-4">State :</p>
                    <p className="h5">{hospitals?.state?.name}</p>
                  </div>
                </div>
              </div>
            )
          }
          <div className="p-md-5 department-doctor-container">
            <div className="body-title p-3">
              <h3 className="font-weight-bold text-blue">Doctors in this hospital</h3>
              <div className="horizontal-bar"></div>
            </div>
            <div>
              {
                doctors?.length > 0 ? (
                  <div className="row p-3">
                    {doctors.map((doctor, index) => (
                      avatarCard(doctor, index)
                    ))}
                  </div>
                ) : (
                  <div className="w-100 p-3">
                    <h5 className="m-0 text-muted text-center">No Doctors</h5>
                  </div>
                )
              }
            </div>
          </div>
        </>
      )}
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isDeleteLoading}
      >
        <Spinner />
      </Backdrop>
    </div>
  );
}
