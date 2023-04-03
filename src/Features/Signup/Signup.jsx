import React, { useState } from 'react';
import './Signup.css';
import { signup } from './Services/SignupServices.jsx';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import { Helmet } from "react-helmet";
import * as Yup from 'yup';
import Notification from '../../Components/Common/Notification/Notification.jsx';
import { Spinner } from "../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";

export default function Signup() {

  const alert = new Notification();
  const navigate = useNavigate();
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);

  const signupHandler = async (signupCredentials) => {
    setIsLoadingBackdrop(true);

    const params = {
      fName: signupCredentials?.fName,
      lName: signupCredentials?.lName,
      email: signupCredentials?.email,
      mobileNo: (signupCredentials?.mobileNo).toString(),
      password: signupCredentials?.userPwd,
      confirmPassword: signupCredentials?.userConfirmPwd
    }

    const isRegistered = await signup(params);

    if (isRegistered?.status) {
      alert.notify(isRegistered?.status, isRegistered?.message);
      navigate('/login');
    } else {
      alert.notify(isRegistered?.status, isRegistered?.message);
    }
    setIsLoadingBackdrop(false);
  }

  const SignupSchema = Yup.object().shape({
    fName: Yup.string()
      .matches(/^[A-Z]+$/i, 'Allow only alphabets.')
      .trim()
      .required('Required'),
    lName: Yup.string()
      .matches(/^[A-Z]+$/i, 'Allow only alphabets.')
      .trim()
      .required('Required'),
    mobileNo: Yup.string()
      .typeError("Invalid contact number")
      .trim()
      .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid phone number')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address.')
      .trim()
      .required('Required'),
    userPwd: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Hint : User@123')
      .min(8, 'Password is too short.')
      .trim()
      .required('Required'),
    userConfirmPwd: Yup.string()
      .oneOf([Yup.ref('userPwd'), null], 'Passwords must be same')
      .min(8, 'Password is too short.')
      .trim()
      .required('Required')
  });

  return (
    <>
      <Helmet>
        <title>Signup | Health Horizon</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className='signup-container'>
        <div className='home-icon-container'>
          <i class="fas fa-home fa-2x home-icon m-3" onClick={() => navigate('/')}></i>
        </div>
        <div className="signup-form-wrapper">
          <div className='signup-form-container'>
            <p className="signup-title">Join health horizon</p>
            <div className="horizontal-separator mb-3"></div>
            <p className="welcome-message">Start your journey with us, Discover the best healthcare services in the country.</p>
            <Formik
              initialValues={{ fName: '', lName: '', mobileNo: '', email: '', userPwd: '', userConfirmPwd: '' }}
              validationSchema={SignupSchema}

              onSubmit={async (values) => {
                signupHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className='signup-form' autoComplete="off">
                  <div className='row mb-lg-4 w-lg-75 px-3'>
                    <div className='col-lg-6 mt-3'>
                      <div className={`form-control ${(errors.fName) && (touched.fName) ? 'invalid-input' : ''}`}>
                        <Field className='input-field' name='fName' type="text" placeholder='First Name' />
                        <i className="fas fa-user"></i>
                      </div>
                      <div className='signup-error-message text-right mr-3'>
                        {(errors.fName) && (touched.fName) ? (errors.fName) : null}
                      </div>
                    </div>

                    <div className='col-lg-6 mt-3'>
                      <div className={`form-control ${(errors.lName) && (touched.lName) ? 'invalid-input' : ''}`}>
                        <Field className='input-field' name='lName' type="text" placeholder='Last Name' />
                        <i className="fas fa-user"></i>
                      </div>
                      <div className='signup-error-message text-right mr-3'>
                        {(errors.lName) && (touched.lName) ? (errors.lName) : null}
                      </div>
                    </div>
                  </div>

                  <div className='row mb-lg-4 w-lg-75 px-3'>
                    <div className='col-lg-6 mt-3'>
                      <div className={`form-control ${(errors.email) && (touched.email) ? 'invalid-input' : ''}`}>
                        <Field className='input-field' name='email' type="text" placeholder='Email' />
                        <i class="fas fa-envelope"></i>
                      </div>
                      <div className='signup-error-message text-right mr-3'>
                        {(errors.email) && (touched.email) ? (errors.email) : null}
                      </div>
                    </div>

                    <div className='col-lg-6 mt-3'>
                      <div className={`form-control ${(errors.mobileNo) && (touched.mobileNo) ? 'invalid-input' : ''}`}>
                        <Field className='input-field' name='mobileNo' type="number" min={0} placeholder='Mobile Number' />
                        <i class="fas fa-phone-alt"></i>
                      </div>
                      <div className='signup-error-message text-right mr-3'>
                        {(errors.mobileNo) && (touched.mobileNo) ? (errors.mobileNo) : null}
                      </div>
                    </div>
                  </div>

                  <div className='row mb-lg-4 w-lg-75 px-3'>
                    <div className='col-lg-6 mt-3'>
                      <div className={`form-control ${(errors.userPwd) && (touched.userPwd) ? 'invalid-input' : ''}`}>
                        <Field className='input-field' name='userPwd' type="password" placeholder='Password' />
                        <i className="fas fa-lock"></i>
                      </div>
                      <div className='signup-error-message text-right mr-3'>
                        {(errors.userPwd) && (touched.userPwd) ? (errors.userPwd) : null}
                      </div>
                    </div>

                    <div className='col-lg-6 mt-3'>
                      <div className={`form-control ${(errors.userConfirmPwd) && (touched.userConfirmPwd) ? 'invalid-input' : ''}`}>
                        <Field className='input-field' name='userConfirmPwd' type="password" placeholder='Confirm Password' />
                        <i className="fas fa-lock"></i>
                      </div>
                      <div className='signup-error-message text-right mr-3'>
                        {(errors.userConfirmPwd) && (touched.userConfirmPwd) ? (errors.userConfirmPwd) : null}
                      </div>
                    </div>
                  </div>

                  <button className="btn-submit">Signup</button>

                  <div className='d-block mx-auto link-container'>
                    <a href="/login" className='additional-link'>Already have an account? Login</a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ zIndex: 1 }}
        open={isLoadingBackdrop}
      >
        <Spinner />
      </Backdrop>
    </>
  )
}