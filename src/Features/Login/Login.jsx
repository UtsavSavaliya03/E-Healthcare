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

export default function Login() {

  const alert = new Notification();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isPatientLogin, setIsPatientLogin] = useState(true);

  const loginHandler = async (loginCredentials) => {
    let isLoggedin = {};

    if (isPatientLogin) {
      isLoggedin = await login(loginCredentials);
    } else {
      isLoggedin = await doctorLogin(loginCredentials);
    }

    if (isLoggedin?.status) {
      setUser({ ...isLoggedin?.data, isLogin: true });
      localStorage.setItem('userId', btoa(isLoggedin?.data?._id));
      localStorage.setItem('token', isLoggedin?.token);
      if (isLoggedin?.data?.role === 0) {
        navigate('/main/dashboard');
      } else if (isLoggedin?.data?.role === 1) {
        navigate('/doctor/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert.notify(isLoggedin?.status, isLoggedin?.message);
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .trim()
      .required('Email address is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, ' ')
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

      <div className={`login-container ${isPatientLogin ? 'login-patient-bg' : "login-doctor-bg"}`}>
        <i class="fas fa-home fa-2x home-icon m-3" onClick={() => navigate('/')}></i>
        <div className="login-form-wrapper">
          <div className='login-form-container'>
            <p className="login-title">Welcome back</p>
            <div className="horizontal-separator mb-3"></div>
            <p className="welcome-message">Please, provide login credential to proceed and have access to all our services</p>
            <div>
              <h5 className='m-0'>
                Want to login as a
                {
                  isPatientLogin ? (
                    <span
                      className='login-method-tag ml-1'
                      onClick={() => setIsPatientLogin(false)}
                    >
                      Doctor?
                    </span>
                  ) : (
                    <span
                      className='login-method-tag ml-1'
                      onClick={() => setIsPatientLogin(true)}
                    >
                      Patient?
                    </span>
                  )
                }
              </h5>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                loginHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className='login-form' autoComplete="off">

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
                    <label className='mx-2'>or</label>
                    <a href="/signup" className='additional-link'>Sign Up</a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}