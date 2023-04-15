import React, { useState } from "react";
import "./AddLaboratory.css";
import Notificaion from "../../../../Components/Common/Notification/Notification.jsx";
import {
  TextField,
  MenuItem
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addLaboratory } from "../../Services/laboratoryServices.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function AddLaboratory() {
  const notification = new Notificaion();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    mobileNo: "",
    shortBio: "",
    addressLine: "",
    state: {},
    city: {},
    pincode: "",
  };

  const LaboratorySchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(" "),
    email: Yup.string().email("Invalid email address.").trim().required(" "),
    mobileNo: Yup.string()
      .typeError("Invalid contact number")
      .trim()
      .matches(/^[1-9]{1}[0-9]{9}$/, "Invalid phone number")
      .required(" "),
    shortBio: Yup.string().required(" "),
    addressLine: Yup.string().required(" "),
    state: Yup.object().required(" "),
    city: Yup.object().required(" "),
    pincode: Yup.string()
      .typeError("Invalid pincode")
      .trim()
      .matches(/^[1-9]{1}[0-9]{5}$/, "Invalid pincode")
      .required(" "),
  });

  const submitHandler = async (laboratoryCredentials) => {
    setIsLoading(true);

    const params = {
      name: laboratoryCredentials?.name,
      email: laboratoryCredentials?.email,
      mobileNo: laboratoryCredentials?.mobileNo.toString(),
      shortBio: laboratoryCredentials?.shortBio,
      addressLine: laboratoryCredentials?.addressLine,
      state: laboratoryCredentials?.state,
      city: laboratoryCredentials?.city,
      pincode: laboratoryCredentials?.pincode,
    }
    const headers = {
      'Authorization': token,
    };
    const laboratory = await addLaboratory(params, headers);
    
    notification.notify(laboratory?.status, laboratory?.message);
    setIsLoading(false);
    if (laboratory?.status) {
      navigate("/main/add-laboratory");
    }
  };

  const AddLaboratoryForm = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: LaboratorySchema,
      onSubmit: (values) => {
        submitHandler(values);
        
      },
    });

    return (
      <div className="add-doctore-body pb-4">
        <div className="add-doctore-header px-0">
          <h3 className="m-0 p-4 text-blue ">Add New Laboratory</h3>
          <hr className="m-0" />
        </div>
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
              <div className="col-sm-4 my-3 my-md-0">
                <TextField
                  className="w-100"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  onChange={formik.handleChange}
                />
                <div className="add-doctor-error-message text-right mr-1">
                  {formik.touched.name ? formik.errors.name : null}
                </div>
              </div>
              <div className="col-sm-4 my-3 my-md-0">
                <TextField
                  className="w-100"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                />
                <div className="add-doctor-error-message text-right mr-1">
                  {formik.touched.email ? formik.errors.email : null}
                </div>
              </div>
              <div className="col-sm-4 my-3 my-md-0">
                <TextField
                  className="w-100"
                  type="number"
                  name="mobileNo"
                  label="Mobile Number"
                  value={formik.values.mobileNo}
                  error={
                    formik.touched.mobileNo && Boolean(formik.errors.mobileNo)
                  }
                  onChange={formik.handleChange}
                />
                <div className="add-doctor-error-message text-right mr-1">
                  {formik.touched.mobileNo ? formik.errors.mobileNo : null}
                </div>
              </div>
            </div>
            <div className="row px-4">
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
              <h5>Address Information</h5>
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
              <div className="col-sm-4 my-3 my-md-0">
                <TextField
                  className="w-100"
                  name="state"
                  label="State"
                  select
                  value={formik.values.state}
                  error={
                    formik.touched.state &&
                    Boolean(formik.errors.state)
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
                  {formik.touched.state
                    ? formik.errors.state
                    : null}
                </div>
              </div>
              <div className="col-sm-4 my-3 my-md-0">
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
                      "IN",
                      formik.values.state?.isoCode
                    ) ? (
                    City.getCitiesOfState(
                      "IN",
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
              <div className="col-sm-4 my-3 my-md-0">
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
            <hr className="mx-3 mb-4" />
            <div className='w-100 text-right px-5'>
              <button className='btn-create-doctor' type='submit'>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Laboratory | Health Horizon</title>
      </Helmet>
      <Backdrop sx={{ zIndex: 1 }} open={isLoading}>
        <Spinner />
      </Backdrop>
      <div className="add-doctore-container py-lg-4 px-lg-5 py-3 px-3">
        <AddLaboratoryForm />
      </div>
    </>
  );
}
