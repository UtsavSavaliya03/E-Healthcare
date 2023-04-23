import React, { useEffect, useState } from "react";
import "./AddDoctor.css";
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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { addDoctor } from "../../Services/doctorServices.jsx";
import { fetchHospitals } from "../../Services/hospitalServices.jsx";
import { fetchActiveDepartments } from "../../Services/departmentServices.jsx";
import { useNavigate } from "react-router-dom";
import { bloodGroupData } from "../../../../Constant/Doctor/doctorDetails.jsx";
import { Helmet } from "react-helmet";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
let Country = require("country-state-city").Country;
let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function AddDoctors() {
  const notification = new Notificaion();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;
  const [isLoading, setIsLoading] = useState(false);
  const Countries = Country.getAllCountries();
  const [profileImg, setProfileImg] = useState(profilePicture);
  const [imgFile, setImgFile] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

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
    fetchDepartmentsHandler();
    fetchHospitalsHandler();
  }, []);

  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    mobileNo: "",
    department: "",
    hospital: "",
    experience: "",
    dateOfBirth: "",
    bloodGroup: "",
    gender: "",
    shortBio: "",
    addressLine: "",
    country: null,
    state: {},
    city: {},
    pincode: "",
    stateOfHospital: null,
    cityOfHospital: null,
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
    hospital: Yup.string().trim().required(" "),
    experience: Yup.number().required(" "),
    dateOfBirth: Yup.date()
      .min("01-01-1900")
      .max(moment(new Date()).format("YYYY-MM-DD"))
      .required(" "),
    bloodGroup: Yup.string().required(" "),
    gender: Yup.string().required("Required"),
    shortBio: Yup.string().required(" "),
    addressLine: Yup.string().required(" "),
    country: Yup.object().required(" "),
    state: Yup.object(),
    city: Yup.object(),
    pincode: Yup.string()
      .typeError("Invalid pincode")
      .trim()
      .matches(/^[1-9]{1}[0-9]{5}$/, "Invalid pincode")
      .required(" "),
    stateOfHospital: Yup.object().required(" "),
    cityOfHospital: Yup.object().required(" "),
  });

  const submitHandler = async (doctorCredentials) => {
    setIsLoading(true);

    let formData = new FormData();
    formData.append("image", imgFile);
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
    formData.append("country", JSON.stringify(doctorCredentials?.country));
    formData.append("state", JSON.stringify(doctorCredentials?.state));
    formData.append("city", JSON.stringify(doctorCredentials?.city));
    formData.append("pincode", doctorCredentials?.pincode);

    const headers = {
      'Authorization': token,
    };
    
    const doctor = await addDoctor(formData, headers);
    notification.notify(doctor?.status, doctor?.message);
    setIsLoading(false);
    if (doctor?.status) {
      navigate("/main/doctor-list");
    }
  };

  const AddDoctorForm = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: DoctorSchema,
      onSubmit: (values) => {
        submitHandler(values);
      },
    });

    return (
      <div className="add-doctore-body pb-4">
        <div className="add-doctore-header px-0">
          <h3 className="m-0 p-4 text-blue">Add New Doctor</h3>
          <hr className="m-0" />
        </div>

        <div className="row px-4">
          <div className="body-title py-3 px-3">
            <h5>Profile Image</h5>
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
        </div>

        <hr className="mx-3" />
        <div className="body-title py-3 px-4">
          <h5>About</h5>
          <div className="horizontal-bar"></div>
        </div>
        <div>
          <form
            className="login-form"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <div className="row px-4 my-md-1">
              <div className="col-sm-3 my-3 my-md-0">
                <TextField
                  className="w-100"
                  name="fName"
                  label="First Name"
                  value={formik.values.fName}
                  error={formik.touched.fName && Boolean(formik.errors.fName)}
                  onChange={formik.handleChange}
                />
                <div className="add-doctor-error-message text-right mr-1">
                  {formik.touched.fName ? formik.errors.fName : null}
                </div>
              </div>
              <div className="col-sm-3 my-3 my-md-0">
                <TextField
                  className="w-100"
                  name="lName"
                  label="Last Name"
                  value={formik.values.lName}
                  error={formik.touched.lName && Boolean(formik.errors.lName)}
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
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
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
                  error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
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
                  {formik.touched.department ? formik.errors.department : null}
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
                  {formik.touched.experience ? formik.errors.experience : null}
                </div>
              </div>
              <div className="col-sm-3 my-3 my-md-0">
                <TextField
                  type="date"
                  className="w-100 date-input"
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
                  {formik.touched.bloodGroup ? formik.errors.bloodGroup : null}
                </div>
              </div>
            </div>

            <div className="px-4">
              <FormControl>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className={`m-0 ${
                    formik.touched.gender && Boolean(formik.errors.gender)
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
                  rows={3}
                  className="w-100"
                  name="shortBio"
                  label="Short Biography"
                  value={formik.values.shortBio}
                  error={
                    formik.touched.shortBio && Boolean(formik.errors.shortBio)
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
              <div className="col-sm-12 my-3 my-md-0">
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
                  value={formik.values.country?.name}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  onChange={formik.handleChange}
                >
                  {Countries?.length > 0 ? (
                    Countries?.map((country, index) => (
                      <MenuItem key={index} value={country}>
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
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  onChange={formik.handleChange}
                >
                  {formik.values.country &&
                  State.getStatesOfCountry(formik.values.country?.isoCode)
                    ?.length > 0 ? (
                    State.getStatesOfCountry(
                      formik.values.country?.isoCode
                    )?.map((stete, index) => (
                      <MenuItem key={index} value={stete}>
                        {stete?.name}
                      </MenuItem>
                    ))
                  ) : (
                    <p className="text-center m-0">No State</p>
                  )}
                </TextField>
                <div className="add-doctor-error-message text-right mr-1">
                  {formik.touched.state ? formik.errors.state : null}
                </div>
              </div>
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
                    formik.values.country?.isoCode,
                    formik.values.state?.isoCode
                  )?.length > 0 ? (
                    City.getCitiesOfState(
                      formik.values.country?.isoCode,
                      formik.values.state?.isoCode
                    )?.map((city, index) => (
                      <MenuItem key={index} value={city}>
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
                      <MenuItem key={index} value={state}>
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
                  error={
                    formik.touched.cityOfHospital &&
                    Boolean(formik.errors.cityOfHospital)
                  }
                  onChange={formik.handleChange}
                >
                  {City.getCitiesOfState(
                    "IN",
                    formik.values.stateOfHospital?.isoCode
                  ) ? (
                    City.getCitiesOfState(
                      "IN",
                      formik.values.stateOfHospital?.isoCode
                    )?.map((city, index) => (
                      <MenuItem key={index} value={city}>
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
                    formik.touched.hospital && Boolean(formik.errors.hospital)
                  }
                  onChange={formik.handleChange}
                >
                  {hospitals && hospitals?.length > 0 ? (
                    hospitals?.map((hospital, index) => {
                      return hospital?.state?.name ===
                        formik.values.stateOfHospital?.name &&
                        hospital?.city?.name ===
                          formik.values.cityOfHospital?.name ? (
                        <MenuItem key={index} value={hospital._id}>
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
            <div className="w-100 text-right px-4">
              <button className="btn-create-doctor" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Add Doctor | Health Horizon</title>
      </Helmet>
      <Backdrop sx={{ zIndex: 1 }} open={isLoading}>
        <Spinner />
      </Backdrop>
      <div className="add-doctore-container py-lg-4 px-lg-5 py-3 px-3">
        <AddDoctorForm />
      </div>
    </>
  );
}
