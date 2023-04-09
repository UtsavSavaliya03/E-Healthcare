import React, { useState } from 'react';
import './Login.css';
import { login, doctorLogin } from './Services/LoginServices.jsx';
import { useRecoilState } from 'recoil';
import { userState } from '../../Store/globalState.jsx';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Helmet } from "react-helmet";
import Notification from '../../Components/Common/Notification/Notification.jsx';
import { Spinner } from "../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Login() {

  const alert = new Notification();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isPatientLogin, setIsPatientLogin] = useState(true);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [totalLoginType, setTotalLoginType] = useState(['patient', 'doctor', 'laboratory']);
  const [loginType, setLoginType] = useState('patient');

  const loginHandler = async (loginCredentials) => {
    setIsLoadingBackdrop(true);
    let isLoggedin = {};

    isLoggedin = await login(loginType, loginCredentials);

    if (isLoggedin?.status) {
      setUser({ ...isLoggedin?.data, isLogin: true });
      localStorage.setItem('userId', btoa(isLoggedin?.data?._id));
      localStorage.setItem('token', isLoggedin?.token);
      if (isLoggedin?.data?.role === 0) {
        navigate('/main/dashboard');
      } else if (isLoggedin?.data?.role === 1) {
        navigate('/doctor/dashboard');
      } else if (isLoggedin?.data?.role === 2) {
        navigate('/laboratory/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
      setIsLoadingBackdrop(false);
    } else {
      alert.notify(isLoggedin?.status, isLoggedin?.message);
      setIsLoadingBackdrop(false);
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .trim()
      .required('Email address is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Provide valid password.')
      .min(8, 'Password is too short')
      .trim()
      .required('No password provided'),
  })

  return (
    <>
      <Helmet>
        <title>Login | Health Horizon</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className={`login-container ${loginType == 'patient' ? 'login-patient-bg' : `${loginType == 'doctor' ? 'login-doctor-bg' : 'login-laboratory-bg'}`}`}>
        <i class="fas fa-home fa-2x home-icon m-3" onClick={() => navigate('/')}></i>
        <div className="login-form-wrapper">
          <div className='login-form-container px-0'>
            <p className="login-title">Welcome back</p>
            <div className="horizontal-separator mb-3"></div>
            <p className="welcome-message">
              {
                loginType == 'patient' ? 'Please, provide login credential to proceed and have access to all our services' : `${loginType == 'doctor' ? 'Please, provide login credential to access patient records, manage appointments, and view test results.' : 'Please, provide login credential to manage and view test reports, and generate reports for doctors and patients.'}`
              }
            </p>
            <div className='text-center'>
              <h5 className='m-0 d-inline'>
                Want to login as a
              </h5>
              <div className='ml-2 login-toggler d-inline'>
                {
                  totalLoginType?.map((type, index) => (
                    <h5
                      key={index}
                      className={`m-0 d-inline mr-2 login-type ${type == loginType ? 'login-type--selected' : ''}`}
                      onClick={() => setLoginType(type)}
                    >
                      {type}?
                    </h5>
                  ))
                }
              </div>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                loginHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className='login-form px-4' autoComplete="off">

                  <div className='mb-4 mt-4'>
                    <div className={`form-control ${(errors.email) && (touched.email) ? 'invalid-input' : ''}`}>
                      <Field className='input-field' name='email' type="text" placeholder='Email' />
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div className='login-error-message text-right mr-3'>
                      {(errors.email) && (touched.email) ? (errors.email) : null}
                    </div>
                  </div>

                  <div>
                    <div className={`form-control ${(errors.password) && (touched.password) ? 'invalid-input' : ''}`}>
                      <Field className='input-field' name='password' type="password" placeholder='Password' />
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className='login-error-message text-right mr-3'>
                      {(errors.password) && (touched.password) ? (errors.password) : null}
                    </div>
                  </div>

                  <button className="btn-submit">Login</button>

                  <div className='d-block mx-auto link-container'>
                    <a href="/forgotPassword" className='additional-link'>Forget Password?</a>
                    {
                      loginType == 'patient' &&
                      <>
                        <label className='mx-2'>or</label>
                        <a href="/signup" className='additional-link'>Sign Up</a>
                      </>
                    }
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