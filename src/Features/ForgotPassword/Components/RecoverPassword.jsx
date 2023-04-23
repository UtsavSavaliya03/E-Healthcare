import React from 'react';
import { recoverPassword } from '../Services/passwordServices.jsx';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Notification from '../../../Components/Common/Notification/Notification.jsx';

export default function RecoverPassword(props) {

    const user = props?.user;

    const alert = new Notification();
    const navigate = useNavigate();

    const resetPasswordSchema = Yup.object().shape({
        otp: Yup.string()
            .min(6)
            .max(6)
            .trim()
            .required('OTP is required'),
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
    })

    const resetPasswordHandler = async (passwordCredentials) => {
        const params = {
            userId: user?.userId,
            otp: (passwordCredentials?.otp).toString(),
            password: passwordCredentials?.userPwd,
            confirmPassword: passwordCredentials?.userConfirmPwd
        }

        const userResponse = await recoverPassword(params);

        if (userResponse?.status) {
            navigate('/login');
        } else {
            alert.notify(userResponse?.status, userResponse?.message);
        }
    }

    return (
        <div className='recover-password-container'>
            <p className="password-title mt-3 mx-3">Reset password</p>
            <div className='d-flex justify-content-center py-1'>
                <div className="horizontal-separator"></div>
            </div>
            <p className="welcome-message">Please type the verification code sent to {user?.email || 'your registered email address'}</p>
            <Formik
                initialValues={{ otp: '', userPwd: '', userConfirmPwd: '' }}
                validationSchema={resetPasswordSchema}
                onSubmit={async (values) => {
                    resetPasswordHandler(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='password-form' action='recoverPassword' autoComplete="off">

                        <div className='my-4 w-lg-75 px-3'>
                            <div className={`form-control ${(errors.otp) && (touched.otp) ? 'invalid-input' : ''}`}>
                                <Field className='input-field' name='otp' type="number" min={0} placeholder='One Time Password' />
                                <i class="fas fa-key"></i>
                            </div>
                            <div className='password-error-message text-right mr-3'>
                                {(errors.otp) && (touched.otp) ? (errors.otp) : null}
                            </div>
                        </div>

                        <div className='mb-4 w-lg-75 px-3'>
                            <div className={`form-control ${(errors.userPwd) && (touched.userPwd) ? 'invalid-input' : ''}`}>
                                <Field className='input-field' name='userPwd' type="password" placeholder='Password' />
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className='signup-error-message text-right mr-3'>
                                {(errors.userPwd) && (touched.userPwd) ? (errors.userPwd) : null}
                            </div>
                        </div>

                        <div className='mb-4 w-lg-75 px-3'>
                            <div className={`form-control ${(errors.userConfirmPwd) && (touched.userConfirmPwd) ? 'invalid-input' : ''}`}>
                                <Field className='input-field' name='userConfirmPwd' type="password" placeholder='Confirm Password' />
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className='signup-error-message text-right mr-3'>
                                {(errors.userConfirmPwd) && (touched.userConfirmPwd) ? (errors.userConfirmPwd) : null}
                            </div>
                        </div>

                        <button className="btn-submit">Update</button>

                        <div className='d-block mx-auto link-container'>
                            <a onClick={props.goBack} className='additional-link'>
                                <i class="fas fa-arrow-left mr-2"></i>
                                Back
                            </a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}