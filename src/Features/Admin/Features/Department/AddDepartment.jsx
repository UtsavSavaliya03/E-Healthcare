import React, { useState } from 'react';
import './AddDepartment.css';
import { Helmet } from "react-helmet";
import { TextField, FormControlLabel, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { addDepartment } from '../../Services/departmentServices.jsx';
import { useNavigate } from 'react-router-dom';
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddDepartment() {

  const notification = new Notificaion;
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || null;

  const initialValues = {
    name: '',
    description: '',
    status: true,
  };

  const DepartmentSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(' '),
    description: Yup.string()
      .required(' '),
    status: Yup.boolean()
      .required('Required'),
  })

  const submitHandler = async (departmentCredentials) => {

    const params ={
      name: departmentCredentials?.name,
      description: departmentCredentials?.description,
      status: departmentCredentials?.status === 'false' ? false : true
    }

    const headers = {
      'Authorization': token
    }
    const department = await addDepartment(departmentCredentials, headers);
    notification.notify(department?.status, department?.message);
    if (department?.status) {
      navigate('/main/department-list');
    }
  }

  const AddDepartmentForm = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: DepartmentSchema,
      onSubmit: (values) => {
        submitHandler(values);
      },
    });

    return (
      <div className='add-department-card pb-4'>
        <div className='add-department-header px-0'>
          <h3 className='m-0 py-2 px-3'>Add New Department</h3>
          <hr className='m-0' />
        </div>
        <div className='px-2'>
          <div className='body-title py-3 px-3'>
            <h5>About</h5>
            <div className='horizontal-bar'></div>
          </div>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className='row px-4 my-md-1'>
              <div className='col-12 col-lg-6 my-3 my-md-0'>
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
              <div className='col-12 my-3 my-md-0'>
                <TextField
                  multiline
                  rows={5}
                  className='w-100'
                  name='description'
                  label="Description"
                  value={formik.values.description}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  onChange={formik.handleChange}
                />
                <div className='add-hospital-error-message text-right mr-1'>
                  {(formik.touched.description) ? (formik.errors.description) : null}
                </div>
              </div>
              <div className='col-12 my-md-0'>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label" className={`m-0 ${(formik.touched.gender && Boolean(formik.errors.gender) ? 'text-danger' : '')}`}>Status</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="Active" />
                    <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                  </RadioGroup>
                </FormControl>
                <div className='add-doctor-gender-error-message'>
                  {(formik.touched.gender) ? (formik.errors.gender) : null}
                </div>
              </div>
              <div className='w-100 text-right px-4'>
                <button className='btn-create-department' type='submit'>Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Helmet>
        <title>Department | Health Horizon</title>
      </Helmet>
      <div className='add-department-container py-4 px-5'>
        <AddDepartmentForm />
      </div>
    </div>
  )
}