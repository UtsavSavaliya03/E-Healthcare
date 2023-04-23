import React, { useEffect, useState } from "react";
import "./ViewDoctor.css";
import { fetchDoctorById } from "../../Services/doctorServices";
import { useNavigate, useLocation } from "react-router-dom";
import profilePicture from "../../../../Assets/Icons/user.png";
import Notificaion from "../../../../Components/Common/Notification/Notification.jsx";
import {
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { updateDoctor } from "../../Services/doctorServices.jsx";
import { bloodGroupData } from "../../../../Constant/Doctor/doctorDetails.jsx";
import {
  sidebarStateAtom,
  editDoctorStateAtom,
} from "../../../../Store/globalState.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import { fetchHospitals } from "../../Services/hospitalServices.jsx";
import { fetchActiveDepartments } from "../../Services/departmentServices.jsx";
import Backdrop from "@mui/material/Backdrop";
import { Helmet } from "react-helmet";
let Country = require("country-state-city").Country;
let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function ViewDoctor() {
  const notification = new Notificaion();
  const navigate = useNavigate();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const doctorId = atob(pathArray[3]) || null;
  const [hospitals, setHospitals] = useState([]);
  const isSidebarOpen = useRecoilValue(sidebarStateAtom);
  const token = localStorage.getItem("token") || null;
  const [doctor, setDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [enableEdit, setEnableEdit] = useRecoilState(editDoctorStateAtom);
  const Countries = Country.getAllCountries();
  const [profileImg, setProfileImg] = useState(profilePicture);
  const [imgFile, setImgFile] = useState(null);
  const [departments, setDepartments] = useState([]);

  const fetchDoctorHandler = async () => {
    setIsLoading(true);

    const headers = {
      'Authorization': token,
    };

    const doctor = await fetchDoctorById(doctorId, headers);
    setDoctor(doctor?.data);

    if (!doctor?.status) {
      navigate("/main/add-doctor");
    }
    setIsLoading(false);
  };

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

  const removeProfileHandler = () => {
    setProfileImg(profilePicture);
    setImgFile(null);
  };

  const fetchHospitalsHandler = async () => {
    const headers = {
      'Authorization': token,
    };

    const hospitals = await fetchHospitals(headers);
    setHospitals(hospitals?.hospital);
  };

  const fetchDepartmentsHandler = async () => {
    const headers = {
      'Authorization': token,
    };

    const departments = await fetchActiveDepartments(headers);
    setDepartments(departments?.department);
  };

  useEffect(() => {
    fetchDoctorHandler();
    fetchHospitalsHandler();
    fetchDepartmentsHandler();

    return () => {
      setEnableEdit(false);
    };
  }, []);

  useEffect(() => {
    if (doctor?.profileImg) {
      setProfileImg(doctor?.profileImg);
    } else {
      setProfileImg(profilePicture);
    }
  }, [doctor]);

  const initialValues = {
    fName: doctor?.fName,
    lName: doctor?.lName,
    email: doctor?.email,
    mobileNo: doctor?.mobileNo,
    department: doctor?.department?._id,
    experience: doctor?.experience,
    dateOfBirth: moment(doctor?.dateOfBirth).format("YYYY-MM-DD"),
    bloodGroup: doctor?.bloodGroup,
    gender: doctor?.gender,
    shortBio: doctor?.shortBio,
    addressLine: doctor?.addressLine,
    country: doctor?.country?.isoCode,
    state: doctor?.state?.isoCode,
    city: doctor?.city?.name,
    pincode: doctor?.pincode,
    hospital: doctor?.hospital?._id,
    stateOfHospital: doctor?.hospital?.state?.isoCode,
    cityOfHospital: doctor?.hospital?.city?.name,
  };

  const DoctorSchema = Yup.object().shape({
    fName: Yup.string()
      .matches(/^[A-Z]+$/i, "Allow only alphabets.")
      .trim()
      .required(" "),
    lName: Yup.string()
      .matches(/^[A-Z]+$/i, "Allow only alphabets.")
      .trim()
      .required(" "),
    email: Yup.string().email("Invalid email address.").trim().required(" "),
    mobileNo: Yup.string()
      .typeError("Invalid contact number")
      .trim()
      .matches(/^[1-9]{1}[0-9]{9}$/, "Invalid phone number")
      .required(" "),
    department: Yup.string().trim().required(" "),
    experience: Yup.number().required(" "),
    dateOfBirth: Yup.date()
      .min("01-01-1950")
      .max(moment(new Date()).format("YYYY-MM-DD"))
      .required(" "),
    bloodGroup: Yup.string().required(" "),
    gender: Yup.string().required("Required"),
    shortBio: Yup.string().required(" "),
    addressLine: Yup.string().required(" "),
    country: Yup.string().required(" "),
    state: Yup.string(),
    city: Yup.string(),
    pincode: Yup.string()
      .typeError("Invalid pincode")
      .trim()
      .matches(/^[1-9]{1}[0-9]{5}$/, "Invalid pincode")
      .required(" "),
    hospital: Yup.string().trim().required(" "),
    stateOfHospital: Yup.string().required(" "),
    cityOfHospital: Yup.string().required(" "),
  });

  const updateHandler = async (doctorCredentials) => {
    setIsLoadingUpdate(true);
    const country = Country.getCountryByCode(doctorCredentials?.country);
    const state =
      State.getStateByCodeAndCountry(
        doctorCredentials?.state,
        doctorCredentials?.country
      ) || {};
    let cityObj = {};
    const allCities = City.getCitiesOfState(country?.isoCode, state?.isoCode);

    allCities?.filter((city) => {
      if (city?.name == doctorCredentials?.city) {
        cityObj = city;
      }
    });

    let formData = new FormData();
    if (profileImg !== doctor?.profileImg) {
      if (profilePicture === profileImg) {
        formData.append("image", null);
      }
      formData.append("image", imgFile);
    }
    formData.append("fName", doctorCredentials?.fName);
    formData.append("lName", doctorCredentials?.lName);
    formData.append("email", doctorCredentials?.email);
    formData.append("mobileNo", doctorCredentials?.mobileNo.toString());
    formData.append("department", doctorCredentials?.department);
    formData.append("experience", doctorCredentials?.experience);
    formData.append("hospital", doctorCredentials?.hospital);
    formData.append("dateOfBirth", doctorCredentials?.dateOfBirth);
    formData.append("bloodGroup", doctorCredentials?.bloodGroup);
    formData.append("gender", doctorCredentials?.gender);
    formData.append("shortBio", doctorCredentials?.shortBio);
    formData.append("addressLine", doctorCredentials?.addressLine);
    formData.append("country", JSON.stringify(country));
    formData.append("state", JSON.stringify(state));
    formData.append("city", JSON.stringify(cityObj));
    formData.append("pincode", doctorCredentials?.pincode);

    const headers = {
      Authorization: token,
    };

    const doctorResponse = await updateDoctor(doctorId, formData, headers);
    notification.notify(doctorResponse?.status, doctorResponse?.message);

    if (doctorResponse?.status) {
      setDoctor(doctorResponse?.data);
      setEnableEdit(false);
      setIsLoadingUpdate(false);
    }
  };

  const UpdateDoctorForm = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: DoctorSchema,
      onSubmit: (values) => {
        updateHandler(values);
      },
    });

    return (
      <div className="pb-4">
        <div className="view-doctore-profile">
          <div className="row py-4">
            <div className="col-sm-12 col-lg-2 py-2 px-5">
              <div className="doctor-profile-img-container">
                <img className="doctor-profile-img" src={profileImg} />
                <div
                  className={`${enableEdit ? "doctor-profile-icons" : "d-none"
                    }`}
                >
                  <i
                    className="fas fa-camera camera-icon mx-1"
                    onClick={upload}
                  ></i>
                  <i
                    className="fas fa-times remove-icon mx-1"
                    onClick={removeProfileHandler}
                  ></i>
                  <input
                    id="profileImgUrl"
                    name="profileImgUrl"
                    accept="image/*"
                    hidden
                    multiple
                    type="file"
                    onChange={(event) => fileChangeHandler(event)}
                  />
                </div>
              </div>
            </div>
            <div
              className={`col-sm-12 col-lg-10 pr-lg-5 px-5 mt-md-3 mt-lg-0 ${isSidebarOpen ? "pl-lg-4" : "pl-lg-2"
                }`}
            >
              <div className="mb-3">
                <h4 className="title m-0">{`${doctor?.fName} ${doctor?.lName}`}</h4>
                <div className="d-flex justify-content-start align-items-center">
                  <p className="value m-0 break-line-1">{doctor?.email}</p>
                  <div className="doctor-card-copy-icon ml-1">
                    <IconButton
                      size="small"
                      onClick={() => {
                        navigator.clipboard.writeText(doctor?.email);
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </div>
              <p className="text-muted m-0">{doctor?.shortBio}</p>
            </div>
          </div>
        </div>

        <div className="view-doctore-edit-container my-5 pb-5">
          <div className="body-title py-3 px-4 d-flex justify-content-between align-items-center">
            <div>
              <h5>About</h5>
              <div className="horizontal-bar"></div>
            </div>
            <div className="edit-icon">
              {enableEdit ? (
                <IconButton
                  onClick={() => {
                    setEnableEdit(false);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setEnableEdit(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
          </div>
          {enableEdit ? (
            <div className="fade-in">
              <form
                className="login-form"
                onSubmit={formik.handleSubmit}
                autoComplete="off"
              >
                <div className="row px-4 my-md-1">
                  <div className="col-sm-3 my-3 my-md-0">
                    <div>
                      <TextField
                        className="w-100"
                        name="fName"
                        label="First Name"
                        value={formik.values.fName}
                        error={
                          formik.touched.fName && Boolean(formik.errors.fName)
                        }
                        onChange={formik.handleChange}
                      />
                      <div className="add-doctor-error-message text-right mr-1">
                        {formik.touched.fName ? formik.errors.fName : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="lName"
                      label="Last Name"
                      value={formik.values.lName}
                      error={
                        formik.touched.lName && Boolean(formik.errors.lName)
                      }
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.lName ? formik.errors.lName : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="email"
                      label="Personal Email"
                      value={formik.values.email}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      onChange={formik.handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.email ? formik.errors.email : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      type="number"
                      name="mobileNo"
                      label="Mobile Number"
                      value={formik.values.mobileNo}
                      error={
                        formik.touched.mobileNo &&
                        Boolean(formik.errors.mobileNo)
                      }
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.mobileNo ? formik.errors.mobileNo : null}
                    </div>
                  </div>
                </div>

                <div className="row px-4 my-md-1">
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="department"
                      label="Department"
                      select
                      value={formik.values.department}
                      error={
                        formik.touched.department &&
                        Boolean(formik.errors.department)
                      }
                      onChange={formik.handleChange}
                    >
                      {departments && departments?.length > 0 ? (
                        departments?.map((department, index) => {
                          return (
                            <MenuItem key={index} value={department._id}>
                              {department?.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <p className="text-center m-0">No Departments</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.department
                        ? formik.errors.department
                        : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      type="number"
                      name="experience"
                      label="Experience"
                      value={formik.values.experience}
                      error={
                        formik.touched.experience &&
                        Boolean(formik.errors.experience)
                      }
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.experience
                        ? formik.errors.experience
                        : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      type="date"
                      className="w-100"
                      name="dateOfBirth"
                      label="Date Of Birth"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.dateOfBirth}
                      error={
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth)
                      }
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.dateOfBirth
                        ? formik.errors.dateOfBirth
                        : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="bloodGroup"
                      label="Blood Group"
                      select
                      value={formik.values.bloodGroup}
                      error={
                        formik.touched.bloodGroup &&
                        Boolean(formik.errors.bloodGroup)
                      }
                      onChange={formik.handleChange}
                    >
                      {bloodGroupData?.map((bloodGroup, index) => (
                        <MenuItem key={index} value={bloodGroup?.value}>
                          {bloodGroup?.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.bloodGroup
                        ? formik.errors.bloodGroup
                        : null}
                    </div>
                  </div>
                </div>

                <div className="px-4">
                  <FormControl>
                    <FormLabel
                      id="demo-radio-buttons-group-label"
                      className={`m-0 ${formik.touched.gender && Boolean(formik.errors.gender)
                        ? "text-danger"
                        : ""
                        }`}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Transgender"
                        control={<Radio />}
                        label="Transgender"
                      />
                    </RadioGroup>
                  </FormControl>
                  <div className="add-doctor-gender-error-message">
                    {formik.touched.gender ? formik.errors.gender : null}
                  </div>
                </div>

                <div className="row px-4 my-3">
                  <div className="col-sm-12">
                    <TextField
                      multiline
                      rows={5}
                      className="w-100"
                      name="shortBio"
                      label="Short Biography"
                      value={formik.values.shortBio}
                      error={
                        formik.touched.shortBio &&
                        Boolean(formik.errors.shortBio)
                      }
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.shortBio ? formik.errors.shortBio : null}
                    </div>
                  </div>
                </div>

                <hr className="mx-3" />
                <div className="body-title py-3 px-4">
                  <h5>Contact Information</h5>
                  <div className="horizontal-bar"></div>
                </div>
                <div className="row px-4 my-sm-3 my-md-1">
                  <div className="col-sm-6 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="addressLine"
                      label="Address Line"
                      value={formik.values.addressLine}
                      error={
                        formik.touched.addressLine &&
                        Boolean(formik.errors.addressLine)
                      }
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.addressLine
                        ? formik.errors.addressLine
                        : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="country"
                      label="Country"
                      select
                      value={formik.values.country}
                      error={
                        formik.touched.country && Boolean(formik.errors.country)
                      }
                      onChange={formik.handleChange}
                    >
                      {Countries?.length > 0 ? (
                        Countries?.map((country, index) => (
                          <MenuItem key={index} value={country?.isoCode}>
                            {country?.name}
                          </MenuItem>
                        ))
                      ) : (
                        <h3>No Country</h3>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.country ? formik.errors.country : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="state"
                      label="State"
                      select
                      value={formik.values.state}
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                      onChange={formik.handleChange}
                    >
                      {formik.values.country &&
                        State.getStatesOfCountry(formik.values.country)?.length >
                        0 ? (
                        State.getStatesOfCountry(formik.values.country)?.map(
                          (stete, index) => (
                            <MenuItem key={index} value={stete?.isoCode}>
                              {stete?.name}
                            </MenuItem>
                          )
                        )
                      ) : (
                        <p className="text-center m-0">No State</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.state ? formik.errors.state : null}
                    </div>
                  </div>
                </div>

                <div className="row px-4 my-sm-3 my-md-1">
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="city"
                      label="City"
                      select
                      value={formik.values.city}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      onChange={formik.handleChange}
                    >
                      {formik.values.state &&
                        City.getCitiesOfState(
                          formik.values.country,
                          formik.values.state
                        )?.length > 0 ? (
                        City.getCitiesOfState(
                          formik.values.country,
                          formik.values.state
                        )?.map((city, index) => (
                          <MenuItem key={index} value={city?.name}>
                            {city?.name}
                          </MenuItem>
                        ))
                      ) : (
                        <p className="text-center m-0">No City</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.city ? formik.errors.city : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="pincode"
                      label="Pincode"
                      type="number"
                      value={formik.values.pincode}
                      error={
                        formik.touched.pincode && Boolean(formik.errors.pincode)
                      }
                      onChange={formik.handleChange}
                    />
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.pincode ? formik.errors.pincode : null}
                    </div>
                  </div>
                </div>

                <hr className="mx-3" />
                <div className="body-title py-3 px-4">
                  <h5>Working Place</h5>
                  <div className="horizontal-bar"></div>
                </div>
                <div className="row px-4 my-sm-3 my-md-1">
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="stateOfHospital"
                      label="State Of Hospital"
                      select
                      value={formik.values.stateOfHospital}
                      error={
                        formik.touched.stateOfHospital &&
                        Boolean(formik.errors.stateOfHospital)
                      }
                      onChange={formik.handleChange}
                    >
                      {State.getStatesOfCountry("IN")?.length > 0 ? (
                        State.getStatesOfCountry("IN")?.map((state, index) => (
                          <MenuItem key={index} value={state?.isoCode}>
                            {state?.name}
                          </MenuItem>
                        ))
                      ) : (
                        <p className="text-center m-0">No State</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.stateOfHospital
                        ? formik.errors.stateOfHospital
                        : null}
                    </div>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="cityOfHospital"
                      label="City Of Hospital"
                      select
                      value={formik.values.cityOfHospital}
                      error={formik.touched.cityOfHospital && Boolean(formik.errors.cityOfHospital)}
                      onChange={formik.handleChange}
                    >
                      {City.getCitiesOfState("IN", formik.values.stateOfHospital) ? (
                        City.getCitiesOfState("IN", formik.values.stateOfHospital)?.map((city, index) => (
                          <MenuItem key={index} value={city?.name}>
                            {city?.name}
                          </MenuItem>
                        ))
                      ) : (
                        <p className="text-center m-0">No City</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.cityOfHospital
                        ? formik.errors.cityOfHospital
                        : null}
                    </div>
                  </div>
                  <div className="col-sm-6 my-3 my-md-0">
                    <TextField
                      className="w-100"
                      name="hospital"
                      label="Hospital"
                      select
                      value={formik.values.hospital}
                      error={
                        formik.touched.hospital &&
                        Boolean(formik.errors.hospital)
                      }
                      onChange={formik.handleChange}
                    >
                      {hospitals && hospitals?.length > 0 ? (
                        hospitals?.map((hospital, index) => {
                          return hospital?.state?.isoCode ===
                            formik.values.stateOfHospital &&
                            hospital?.city?.name ===
                            formik.values.cityOfHospital ? (
                            <MenuItem key={index} value={hospital?._id}>
                              {hospital?.name}
                            </MenuItem>
                          ) : (
                            <></>
                          );
                        })
                      ) : (
                        <p className="text-center m-0">No Hospitals</p>
                      )}
                    </TextField>
                    <div className="add-doctor-error-message text-right mr-1">
                      {formik.touched.hospital ? formik.errors.hospital : null}
                    </div>
                  </div>
                </div>

                <hr className="mx-3 mb-4" />
                <div className="w-100 text-right px-5">
                  <button className="btn-create-doctor" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <DisplayDoctorInformation />
          )}
        </div>
      </div>
    );
  };

  const DisplayDoctorInformation = () => {
    return (
      <div className="fade-in">
        <div className="row px-4 pb-lg-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">First Name</p>
            <p className="value m-0">{doctor?.fName}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Last Name</p>
            <p className="value m-0">{doctor?.lName}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Personal Email</p>
            <p className="value break-line-1 m-0">{doctor?.email}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Mobile Number</p>
            <p className="value m-0">{doctor?.mobileNo}</p>
          </div>
        </div>

        <div className="row px-4 py-md-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Department</p>
            <p className="value m-0">{doctor?.department?.name}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Experience</p>
            <p className="value m-0">
              {doctor?.experience}{" "}
              {`${doctor?.experience > 1 ? "Years" : "Year"}`}
            </p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Date Of Birth</p>
            <p className="value m-0">
              {moment(doctor.dateOfBirth).format("LL")}
            </p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Blood Group</p>
            <p className="value m-0">{doctor?.bloodGroup}</p>
          </div>
        </div>

        <div className="row px-4 py-md-3">
          <div className="col-12 my-3 my-md-0">
            <p className="label m-0">Gender</p>
            <p className="value m-0">{doctor?.gender}</p>
          </div>
        </div>

        <div className="row px-4 py-lg-3">
          <div className="col-12 my-3 my-md-0">
            <p className="value m-0">Short Biography</p>
            <p className="text-muted m-0">{doctor?.shortBio}</p>
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
            <p className="value break-line-1 m-0">{doctor?.addressLine}</p>
          </div>
        </div>

        <div className="row px-4 py-md-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Country</p>
            <p className="value m-0">{doctor?.country?.name}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">State</p>
            <p className="value m-0">{doctor?.state?.name || "---"}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">City</p>
            <p className="value m-0">{doctor?.city?.name || "---"}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Pincode</p>
            <p className="value m-0">{doctor?.pincode}</p>
          </div>
        </div>

        <hr className="mx-3" />
        <div className="body-title py-3 px-4">
          <h5>Working Place</h5>
          <div className="horizontal-bar"></div>
        </div>
        <div className="row px-4 py-md-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">State Of Hospital</p>
            <p className="value m-0">{doctor?.hospital?.state?.name}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">City Of Hospital</p>
            <p className="value m-0">{doctor?.hospital?.city?.name}</p>
          </div>
          <div className="col-sm-6 my-3 my-md-0">
            <p className="label m-0">Hospital</p>
            <p className="value m-0">{doctor?.hospital?.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>{`Dr. ${doctor?.fName} ${doctor?.lName}` || 'Doctor'} | Health Horizon</title>
      </Helmet>
      <Backdrop sx={{ zIndex: 1 }} open={isLoadingUpdate}>
        <Spinner />
      </Backdrop>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="add-doctore-container py-lg-4 px-lg-5 py-3 px-3">
          <UpdateDoctorForm />
        </div>
      )}
    </div>
  );
}
