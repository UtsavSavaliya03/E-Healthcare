import React, { useState } from 'react';
import './AddDepartment.css';
import { Helmet } from "react-helmet";
import { TextField, FormControlLabel, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { addDepartment } from '../../Services/departmentServices.jsx';
import { useNavigate } from 'react-router-dom';
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import departmentProfilePicture from '../../../../Assets/Icons/user.png';
import backgroundPicture from '../../../../Assets/Backgrounds/bg-dpt.jpg';
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";

export default function AddDepartment() {

  const notification = new Notificaion();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || null;
  const [departmentProfileImg, setDepartmentProfileImg] = useState(departmentProfilePicture);
  const [departmentImgFile, setdepartmentImgFile] = useState(null);
  const [departmentBackgroundImgFile, setdepartmentBackgroundImgFile] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(backgroundPicture);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    let formData = new FormData();
    formData.append("profileImg", departmentImgFile);
    formData.append("backgroungImg", departmentBackgroundImgFile);
    formData.append("name", departmentCredentials?.name);
    formData.append("description", departmentCredentials?.description);
    formData.append("status", departmentCredentials?.status === 'false' ? false : true);

    const headers = {
      'Authorization': token
    }
    const department = await addDepartment(formData, headers);
    notification.notify(department?.status, department?.message);

    if (department?.status) {
      navigate('/main/department-list');
    }

    setIsLoading(false);
    setDepartmentProfileImg(departmentProfilePicture);
    setdepartmentImgFile(null);
    setdepartmentBackgroundImgFile(null);
  }

  const upload = () => {
    document.getElementById("departmentProfileImgUrl").click()
  }
  const uploadBackground = () => {
    document.getElementById("departmentBackgroundImgUrl").click()
  }

  const maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 1) {
      notification.notify(false, 'Maximum 1 file is allowed...!');
      event.target.value = null;
      return false;
    } else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2000000) { // 1 MB
          notification.notify(false, "File must be less then 2 Mb...!")
          return false;
        }
      }
    }
    return true;
  }

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file != null) {
      if (maxSelectFile(event)) {
        setDepartmentProfileImg(URL.createObjectURL(file));
        setdepartmentImgFile(file);
      }
    }
  }
  const backgroundFileChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file != null) {
      if (maxSelectFile(event)) {
        setBackgroundImg(URL.createObjectURL(file));
        setdepartmentBackgroundImgFile(file);
      }
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
      <>
        <div className='add-department-card pb-4'>
          <div className='add-department-header px-0'>
            <h3 className='m-0 text-blue p-4'>Add New Department</h3>
            <hr className='m-0' />

          </div>
          <div className='row dpt-background-img-container px-2 m-0'>
            <div className='my-3 col-md-12'>
              <div className='d-flex department-profile-icons '>

                <i className="fas ml-auto fa-camera camera-icon mx-2 " onClick={uploadBackground} ></i>
                <i className="fas  fa-times remove-icon mx-2" onClick={() => { setBackgroundImg(backgroundPicture) }} ></i>
              </div>
              <img
                className='dpt-background-img w-100'
                src={backgroundImg}
              />
              <input
                id="departmentBackgroundImgUrl"
                name='departmentBackgroundImgUrl'
                accept="image/*"
                hidden
                type="file"
                onChange={(event) => backgroundFileChangeHandler(event)}

              />
            </div>

            <div className=' py-3 px-2 dpt-profile-img-container'>
              <div className='doctor-profile-img-container'>
                <img
                  className='doctor-profile-img'
                  src={departmentProfileImg}
                />
                <div className='doctor-profile-icons'>
                  <i className="fas fa-camera camera-icon mx-1" onClick={upload} ></i>
                  <i className="fas fa-times remove-icon mx-1" onClick={() => { setDepartmentProfileImg(departmentProfilePicture) }}></i>
                  <input
                    id="departmentProfileImgUrl"
                    name='departmentProfileImgUrl'
                    accept="image/*"
                    hidden
                    type="file"
                    onChange={(event) => fileChangeHandler(event)}

                  />
                </div>
              </div>
            </div>
          </div>
          <hr className='w-100 mt-5' />
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
      </>
    )
  }

  return (
    <div>
      <Helmet>
        <title>Add Department | Health Horizon</title>
      </Helmet>
      <div className='add-department-container py-4 px-5'>
        <AddDepartmentForm />
      </div>
      <Backdrop sx={{ zIndex: 1 }} open={isLoading}>
        <Spinner />
      </Backdrop>
    </div>
  )
}