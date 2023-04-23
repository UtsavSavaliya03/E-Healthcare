import React, { useState } from 'react';
import './ForgotPassword.css';
import { sendOtp } from './Services/passwordServices.jsx';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import { Helmet } from "react-helmet";
import * as Yup from 'yup';
import Notification from '../../Components/Common/Notification/Notification.jsx';
import RecoverPassword from './Components/RecoverPassword.jsx';

export default function ForgotPassword() {

  const alert = new Notification();
  const navigate = useNavigate();
  const [user, setUser] = useState({ userId: '', email: '' });
  const [isOtpSent, setIsOtpSent] = useState(false);

  const goBackHandler = () => {
    setIsOtpSent(false);
  }

  const sendOtpHandler = async (userCredentials) => {
    const params = {
      email: userCredentials?.email
    }
    const isOtpSent = await sendOtp(params);

    if (isOtpSent?.status) {
      setUser(isOtpSent?.data);
      setIsOtpSent(true);
    } else {
      alert.notify(isOtpSent?.status, isOtpSent?.message);
    }
  }

  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .trim()
      .required('Email address is required'),
  })

  return (
    <>
      <Helmet>
        <title>Forgot Password | Health Horizon</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className='password-container'>
        <i class="fas fa-home fa-2x home-icon m-3" onClick={() => navigate('/')}></i>
        <div className="password-form-wrapper">
          <div className='password-form-container'>
            {isOtpSent ? (
              <RecoverPassword user={user} goBack={goBackHandler} />
            ) : (
              <div className='send-otp-container'>
                <p className="password-title mt-5">Forgot password?</p>
                <div className='d-flex justify-content-center py-1'>
                  <div className="horizontal-separator"></div>
                </div>
                <p className="welcome-message">Please, enter the email address associated with your account.</p>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={emailSchema}
                  onSubmit={async (values) => {
                    sendOtpHandler(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className='password-form' action='sendOtp' autoComplete="off">

                      <div className='mb-2 mt-4 w-lg-75 px-3'>
                        <div className={`form-control ${(errors.email) && (touched.email) ? 'invalid-input' : ''}`}>
                          <Field className='input-field' name='email' type="text" placeholder='Email' />
                          <i class="fas fa-envelope"></i>
                        </div>
                        <div className='password-error-message text-right mr-3'>
                          {(errors.email) && (touched.email) ? (errors.email) : null}
                        </div>
                      </div>

                      <button className="btn-submit">Next</button>

                      <div className='d-block mx-auto link-container'>
                        <a onClick={() => navigate(-1)} className='additional-link'>
                          <i class="fas fa-arrow-left mr-2"></i>
                          Back
                        </a>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}