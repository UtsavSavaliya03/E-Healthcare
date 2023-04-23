import React, { useEffect, useState } from 'react';
import './ViewDepartment.css';
import departmentImg from '../../../../Assets/Backgrounds/common-department.jpg';
import { fetchDepartmentById } from '../../Services/departmentServices.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import Alert from '../../../../Components/Common/Alert/SweetAlert.jsx';
import { deleteDepartment } from '../../Services/departmentServices.jsx';
import { IconButton } from '@mui/material';
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from '@mui/icons-material/Delete';
import Notificaion from '../../../../Components/Common/Notification/Notification.jsx';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from "@mui/icons-material/Clear";
import departmentProfilePicture from '../../../../Assets/Icons/user.png';
import backgroundPicture from '../../../../Assets/Backgrounds/bg-dpt.jpg';
import { TextField, FormControlLabel, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { updateDepartment } from '../../Services/departmentServices.jsx';
import { Helmet } from 'react-helmet';

export default function ViewDepartment() {

  const alert = new Alert();
  const notification = new Notificaion;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const pathArray = (location.pathname).split('/');
  const departmentId = atob(pathArray[3]) || null;
  const token = localStorage.getItem('token') || null;
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [doctorsDetails, setDoctorsDetails] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const [departmentProfileImg, setDepartmentProfileImg] = useState(departmentProfilePicture);
  const [departmentImgFile, setdepartmentImgFile] = useState(null);
  const [departmentBackgroundImgFile, setdepartmentBackgroundImgFile] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(backgroundPicture);

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
        if (files[i].size > 2000000) { // 2 MB
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

  const fetchDepartmentByIdHandle = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token
    }
    const department = await fetchDepartmentById(departmentId, headers);
    setDepartmentDetails(department.data?.department);
    setDoctorsDetails(department.data?.doctors);
    if (department.data?.department?.backgroundImg) {
      setBackgroundImg(department.data?.department?.backgroundImg);
    }
    if (department.data?.department?.profileImg) {
      setDepartmentProfileImg(department.data?.department?.profileImg);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDepartmentByIdHandle();
  }, []);

  const deleteHandler = async () => {
    setIsDeleteLoading(true);
    const headers = {
      'Authorization': token
    }
    const departmentResponse = await deleteDepartment(departmentId, headers);
    if (departmentResponse?.status) {
      alert.alert('success', 'Done!', 'Deleted Successfully!');
      navigate('/main/department-list');
    } else {
      notification.notify(departmentResponse?.status, departmentResponse?.message);
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

  const initialValues = {
    name: departmentDetails?.name,
    description: departmentDetails?.description,
    status: departmentDetails?.status,
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

    if (departmentProfileImg !== departmentDetails?.profileImg) {
      if (departmentProfilePicture === departmentProfileImg) {
        formData.append("removeProfile", true);
      } else {
        formData.append("profileImg", departmentImgFile);
      }
    }
    if (backgroundImg !== departmentDetails?.backgroundImg) {
      if (backgroundPicture === backgroundImg) {
        formData.append("removeBg", true);
      } else {
        formData.append("backgroundImg", departmentBackgroundImgFile);
      }
    }
    formData.append("name", departmentCredentials?.name);
    formData.append("description", departmentCredentials?.description);
    formData.append("status", departmentCredentials?.status === 'false' ? false : true);

    const headers = {
      'Authorization': token
    }

    const department = await updateDepartment(departmentDetails?._id, formData, headers);
    notification.notify(department?.status, department?.message);

    if (department?.status) {
      setEnableEdit(false);
      fetchDepartmentByIdHandle();
    }

    setIsLoading(false);
    setDepartmentProfileImg(departmentProfilePicture);
    setdepartmentImgFile(null);
    setdepartmentBackgroundImgFile(null);
  }


  const EditDepartmentForm = () => {

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: DepartmentSchema,
      onSubmit: (values) => {
        submitHandler(values);
      },
    });

    return (
      <div>
        <div className='add-department-card pb-4'>
          <div className='add-department-header px-0 d-flex justify-content-between align-items-center'>
            <h3 className='m-0 text-blue p-4'>Update Department</h3>
            <IconButton
              onClick={() => setEnableEdit(false)}
              className='btn-edit-dpt mr-4'
            >
              <ClearIcon />
            </IconButton>
          </div>
          <hr className='m-0' />
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
                  <button className='btn-create-department' type='submit'>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='department-container p-4'>
      <Helmet>
        <title>{departmentDetails?.name || 'Department'} | Health Horizon</title>
      </Helmet>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='departmen-info-card-container d-flex justify-content-center mb-5'>
            {
              enableEdit ? (
                <div className='fade-in w-100'>
                  <EditDepartmentForm />
                </div>
              ) : (
                <>
                  <div className="leftbox fade-in p-3 w-100">
                    <img src={departmentDetails?.backgroundImg || departmentImg} alt="" className='rounded-0 mt-2 department-img' />
                  </div>
                  <div className="rightbox p-3 pt-5 w-100 fade-in">
                    <div className='info-para w-100'>
                      <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                        <h2 className='text-blue font-weight-bold m-0'>{departmentDetails?.name}</h2>
                        <div className='d-flex justify-content-between align-items-center action-btn-container'>
                          <IconButton
                            onClick={() => setEnableEdit(true)}
                            className='m-2 btn-edit-dpt d-flex ml-auto'
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            className='ml-2 btn-delete-dpt'
                            onClick={openDeletePopup}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                      <div className='mb-4'>
                        {departmentDetails?.status ? (
                          <p className="active-status-tag">Active</p>
                        ) : (
                          <p className="inactive-status-tag">Inactive</p>
                        )}
                      </div>
                      <p>{departmentDetails?.description}</p>
                    </div>
                  </div>
                </>
              )
            }
          </div>
          <div className="p-md-5 department-doctor-container">
            <div className="body-title p-3">
              <h3 className="font-weight-bold text-blue">Doctors in this department</h3>
              <div className="horizontal-bar"></div>
            </div>
            <div>
              {
                doctorsDetails?.length > 0 ? (
                  <div className="row p-3">
                    {doctorsDetails.map((doctor, index) => (
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
  )
}