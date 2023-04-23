import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../Store/globalState';
import Avatar from 'react-avatar';
import { IconButton } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';
import Notification from '../../../../Components/Common/Notification/Notification';
import profilePicture from "../../../../Assets/Icons/user.png";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  MenuItem
} from "@mui/material";
import { updatePatient } from '../../../Patient/Services/userServices.jsx';
import { genderData } from "../../../../Constant/ProfileDetails/GenderDetails.jsx";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import { Helmet } from 'react-helmet';
let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function Profile() {

  const States = State.getStatesOfCountry('IN');
  const notification = new Notification();
  const token = localStorage.getItem("token") || null;
  const [user, setUser] = useRecoilState(userState);
  const [enableEdit, setEnableEdit] = useState(false);
  const [profileImg, setProfileImg] = useState(profilePicture);
  const [imgFile, setImgFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 1) {
      notification.notify(false, "Maximum 1 file is allowed...!");
      event.target.value = null;
      return false;
    } else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1000000) {
          // 1 MB
          notification.notify(false, "Fiel must be less then 1 Mb...!");
        }
      }
    }
    return true;
  };

  useEffect(() => {
    if (user?.profileImg) {
      setProfileImg(user?.profileImg)
    }
  }, [])

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file != null) {
      if (maxSelectFile(event)) {
        setProfileImg(URL.createObjectURL(file));
        setImgFile(file);
      }
    }
  };

  const upload = () => {
    document.getElementById("profileImgUrl").click();
  };

  const submitHandler = async (values, { resetForm }) => {

    setIsLoading(true);
    const state = State.getStateByCodeAndCountry(values?.state, 'IN') || {};
    let cityObj = {};
    const allCities = City.getCitiesOfState('IN', state?.isoCode);

    allCities?.filter((city) => {
      if (city?.name == values?.city) {
        cityObj = city;
      }
    });

    let formData = new FormData();

    if (profileImg !== user?.profileImg) {
      if (profilePicture === profileImg) {
        formData.append("removeImg", true);
      } else {
        formData.append("image", imgFile);
      }
    }

    formData.append('fName', values?.fName);
    formData.append('lName', values?.lName);
    formData.append('mobileNo', values?.mobileNo);
    formData.append('age', values?.age);
    formData.append('gender', values?.gender);
    formData.append('addressLine', values?.addressLine);
    formData.append('state', JSON.stringify(state));
    formData.append('city', JSON.stringify(cityObj));
    formData.append('pincode', values?.pincode);


    const headers = {
      'Authorization': token,
    };

    const userProfile = await updatePatient(user._id, formData, headers);
    if (userProfile?.status) {
      setUser(userProfile?.data);
      resetForm();
      setEnableEdit(false);
      setIsLoading(false);
    }
    notification.notify(userProfile?.status, userProfile?.message);
    setIsLoading(false);
  }

  const initialValues = {
    fName: user?.fName,
    lName: user?.lName,
    email: user?.email,
    mobileNo: user?.mobileNo,
    age: user?.age,
    gender: user?.gender,
    addressLine: user?.addressLine,
    state: user?.state?.isoCode,
    city: user?.city?.name,
    pincode: user?.pincode,
  }

  const ProfileDetailsSchema = Yup.object().shape({
    fName: Yup.string()
      .matches(/^[A-Z]+$/i, 'Allow only alphabets.')
      .trim()
      .required('Required'),
    lName: Yup.string()
      .matches(/^[A-Z]+$/i, 'Allow only alphabets.')
      .trim()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address.')
      .trim()
      .required('Required'),
    mobileNo: Yup.string()
      .typeError("Invalid contact number")
      .trim()
      .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid phone number')
      .required('Required'),
    age: Yup.string()
      .trim()
      .required(" "),
    gender: Yup.string().required(" "),
    addressLine: Yup.string()
      .required(" "),
    state: Yup.string().required(" "),
    city: Yup.string().required(" "),
    pincode: Yup.string()
      .typeError("Invalid pincode")
      .trim()
      .matches(/^[1-9]{1}[0-9]{5}$/, "Invalid pincode")
      .required(" "),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ProfileDetailsSchema,
    onSubmit: (values, { resetForm }) => {
      submitHandler(values, { resetForm });
    },
  });

  return (
    <div className='py-3 px-4 user-account-container'>
      <Helmet>
        <title>My Account | Health Horizon</title>
      </Helmet>
      <div className='profile-card fade-in'>
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='text-blue p-4 m-0'>My Account</h3>
          <div>
            {enableEdit ? (
              <IconButton
                onClick={() => setEnableEdit(false)}
                className='mr-4'
              >
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setEnableEdit(true)}
                className='mr-4 btn-edit-hospital'
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
        </div>
        <hr className='m-0' />
        <div>
          {enableEdit ? (
            <div>
              <div className="body-title py-3 px-4">
                <h5>Profile Picture</h5>
                <div className="horizontal-bar"></div>
              </div>
              <div className="col-sm-12 py-2 px-5">
                <div className="doctor-profile-img-container">
                  <img className="doctor-profile-img" src={profileImg} />
                  <div className="doctor-profile-icons">
                    <i
                      className="fas fa-camera camera-icon mx-1"
                      onClick={upload}
                    ></i>
                    <i
                      className="fas fa-times remove-icon mx-1"
                      onClick={() => {
                        setProfileImg(profilePicture);
                      }}
                    ></i>
                    <input
                      id="profileImgUrl"
                      name="profileImgUrl"
                      accept="image/*"
                      hidden
                      type="file"
                      onChange={(event) => fileChangeHandler(event)}
                    />
                  </div>
                </div>
              </div>
              <div className="body-title py-3 px-4">
                <h5>Personal Information</h5>
                <div className="horizontal-bar"></div>
              </div>
              <form autoComplete='off' className='pb-5' onSubmit={formik.handleSubmit}>
                <div className="row my-sm-3 my-md-1 py-2 px-4">
                  <div className='col-sm-3 my-3 my-md-0'>
                    <TextField
                      className='w-100'
                      name='fName'
                      label="First Name"
                      value={formik.values.fName}
                      error={formik.touched.fName && Boolean(formik.errors.fName)}
                      onChange={formik.handleChange}
                    />
                    <div className='add-hospital-error-message text-right mr-1'>
                      {(formik.touched.fName) ? (formik.errors.fName) : null}
                    </div>
                  </div>
                  <div className='col-sm-3 my-3 my-md-0'>
                    <TextField
                      className='w-100'
                      type='lName'
                      name='lName'
                      label="Last Name"
                      value={formik.values.lName}
                      error={formik.touched.lName && Boolean(formik.errors.lName)}
                      onChange={formik.handleChange}
                    />
                    <div className='add-hospital-error-message text-right mr-1'>
                      {(formik.touched.lName) ? (formik.errors.lName) : null}
                    </div>
                  </div>
                  <div className='col-sm-3 my-3 my-md-0'>
                    <TextField
                      className='w-100'
                      name='email'
                      label="Email"
                      InputProps={{
                        readOnly: true,
                      }}
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
                <div className="row my-sm-3 my-md-1 py-2 px-4">
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      type='number'
                      name="age"
                      label="Age"
                      value={formik.values.age}
                      error={formik.touched.age && Boolean(formik.errors.age)}
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.age ? formik.errors.age : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="gender"
                      label="Gender"
                      select
                      value={formik.values.gender}
                      error={formik.touched.gender && Boolean(formik.errors.gender)}
                      onChange={formik.handleChange}
                    >
                      {genderData?.map((gender, index) => (
                        <MenuItem key={index} value={gender?.value}>
                          {gender?.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.gender
                        ? formik.errors.gender
                        : null}
                    </div>
                  </div>
                </div>

                <hr className="mx-3" />
                <div className="body-title py-3 px-4">
                  <h5>Contact Information</h5>
                  <div className="horizontal-bar"></div>
                </div>

                <div className="row my-sm-3 my-md-1 py-2 px-4">
                  <div className="col-sm-9 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="addressLine"
                      label="Address"
                      value={formik.values.addressLine}
                      error={formik.touched.addressLine && Boolean(formik.errors.addressLine)}
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.addressLine ? formik.errors.addressLine : null}
                    </div>
                  </div>
                </div>

                <div className="row my-sm-3 my-md-1 py-2 px-4">
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="state"
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
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.age ? formik.errors.age : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className='w-100'
                      name='city'
                      label="City"
                      select
                      value={formik.values.city}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      onChange={formik.handleChange}
                    >
                      {City.getCitiesOfState("IN", formik.values.state).length > 0 ? (
                        City.getCitiesOfState("IN", formik.values.state)?.map((city, index) => (
                          <MenuItem key={index} value={city?.name}>
                            {city?.name}
                          </MenuItem>
                        ))
                      ) : (
                        <p className="text-center m-0">No City</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.gender ? formik.errors.gender : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      type='number'
                      className="w-100"
                      name="pincode"
                      label="Pincode"
                      value={formik.values.pincode}
                      error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.gender ? formik.errors.gender : null}
                    </div>
                  </div>
                </div>

                <hr className='mx-3 mb-4' />
                <div className='w-100 text-right px-5'>
                  <button className='btn-create-doctor' type='submit'>Update</button>
                </div>

              </form>
            </div>
          ) : (
            <div className='pb-lg-5 fade-in'>
              <div className="body-title py-3 px-4">
                <h5>Profile Picture</h5>
                <div className="horizontal-bar"></div>
              </div>
              <div className='px-4 mb-4'>
                <Avatar round size='120' name={`${user?.fName} ${user?.lName}`} src={user?.profileImg} />
              </div>

              <div className="body-title py-3 px-4">
                <h5>Personal Information</h5>
                <div className="horizontal-bar"></div>
              </div>

              <div className="row px-4 pb-lg-3">
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">First Name</p>
                  <p className="value m-0">{user?.fName}</p>
                </div>
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">Last Name</p>
                  <p className="value m-0">{user?.lName}</p>
                </div>
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">Personal Email</p>
                  <p className="value break-line-1 m-0">{user?.email}</p>
                </div>
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">Mobile Number</p>
                  <p className="value m-0">+91 {user?.mobileNo}</p>
                </div>
              </div>

              <div className="row px-4 py-md-3">
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">Gender</p>
                  <p className="value m-0">{user?.gender}</p>
                </div>
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">Age</p>
                  <p className="value m-0">{user?.age}</p>
                </div>
              </div>

              <hr className="mx-3" />
              <div className="body-title py-3 px-4">
                <h5>Contact Information</h5>
                <div className="horizontal-bar"></div>
              </div>

              <div className="row px-4 py-lg-3">
                <div className="col-12 my-3 my-md-0">
                  <p className="label m-0">Address</p>
                  <p className="value break-line-1 m-0">{user?.addressLine}</p>
                </div>
              </div>

              <div className="row px-4 py-md-3">
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">State</p>
                  <p className="value m-0">{user?.state?.name || "---"}</p>
                </div>
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">City</p>
                  <p className="value m-0">{user?.city?.name || "---"}</p>
                </div>
                <div className="col-sm-3 my-3 my-md-0">
                  <p className="label m-0">Pincode</p>
                  <p className="value m-0">{user?.pincode}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Backdrop sx={{ zIndex: 1 }} open={isLoading}>
        <Spinner />
      </Backdrop>
    </div>
  )
}
