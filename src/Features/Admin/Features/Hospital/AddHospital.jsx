import React from 'react';
import './AddHospital.css';
import { TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addHospital } from '../../Services/hospitalServices.jsx';
import { useNavigate } from 'react-router-dom';
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';
import { Helmet } from "react-helmet";
let State = require('country-state-city').State;
let City = require('country-state-city').City;

export default function AddHospital() {

  const States = State.getStatesOfCountry('IN');
  const notification = new Notificaion;
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || null;

  const initialValues = {
    name: '',
    email: '',
    mobileNo: '',
    shortBio: '',
    addressLine: '',
    state: null,
    city: null,
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
    state: Yup.object()
      .required(' '),
    city: Yup.object()
      .required(' '),
  })

  const submitHandler = async (hospitalCredentials) => {

    const params = {
      name: hospitalCredentials?.name,
      email: hospitalCredentials?.email,
      mobileNo: hospitalCredentials?.mobileNo.toString(),
      shortBio: hospitalCredentials?.shortBio,
      addressLine: hospitalCredentials?.addressLine,
      state: hospitalCredentials?.state,
      city: hospitalCredentials?.city,
    }

    const headers = {
      'Authorization': token
    }
    const hospital = await addHospital(params, headers);
    notification.notify(hospital?.status, hospital?.message);
    if (hospital?.status) {
      navigate('/main/hospital-list');
    }
    
  }

  const AddHospitalForm = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: DoctorSchema,
      onSubmit: (values) => {
        submitHandler(values);
      },
    });

    return (
      <div className='add-hospital-card pb-4'>
        <div className='add-doctore-header px-0'>
          <h3 className='m-0 text-blue p-4'>Add New Hospital</h3>
          <hr className='m-0' />
        </div>
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
                        <MenuItem key={index} value={stete}>{stete?.name}</MenuItem>
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
                  {
                    formik.values.state &&
                      (City.getCitiesOfState('IN', formik.values.state?.isoCode)?.length > 0) ? (
                      City.getCitiesOfState('IN', formik.values.state?.isoCode)?.map((city, index) => (
                        <MenuItem key={index} value={city}>{city?.name}</MenuItem>
                      ))
                    ) : (
                      <p className='text-center m-0'>No City</p>
                    )
                  }
                </TextField>
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.city) ? (formik.errors.city) : null}
                </div>
              </div>
            </div>

            <hr className='mx-3 mb-4' />
            <div className='w-100 text-right px-5'>
              <button className='btn-create-doctor' type='submit'>Create</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Add Hospital | Health Horizon</title>
      </Helmet>
      <div className='add-hospital-container px-5 py-4'>
        <AddHospitalForm />
      </div>
    </>
  )
}