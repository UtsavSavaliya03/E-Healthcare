import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue } from 'recoil';
import { changePasswordModal, userState } from '../../../Store/globalState';
import Notificaion from "../../Common/Notification/Notification.jsx";
import { Spinner } from "../../Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from "@mui/material";
import { changePassword } from '../Services/userServices';

export default function PasswordModal() {

    const user = useRecoilValue(userState);
    const notification = new Notificaion();

    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useRecoilState(changePasswordModal);

    const onClose = () => {
        setOpen(false);
    }

    const initialValues = {
        currentPassword: '',
        userPwd: '',
        userConfirmPwd: '',
    };

    const ChnagePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string()
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

    const submitHandler = async (values, { resetForm }) => {
        setIsLoading(true);

        let type;
        const headers = {
            'Authorization': token,
        };

        if (user?.role === 0 || user?.role === 3) {
            type = 'patient';
        } else if (user?.role === 1) {
            type = 'doctor';
        } else {
            type = 'laboratory';
        }

        const params = {
            userId: user?._id,
            currentPassword: values?.currentPassword,
            password: values?.userPwd,
            confirmPassword: values?.userConfirmPwd
        }

        const userResponse = await changePassword(type, params, headers);

        notification.notify(userResponse?.status, userResponse?.message);
        if (userResponse?.status) {
            setOpen(false);
            resetForm();
        }
        setIsLoading(false);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ChnagePasswordSchema,
        onSubmit: (values, { resetForm }) => {
            submitHandler(values, { resetForm });
        },
    });

    return (
        <>
            <Dialog
                style={{ zIndex: 1 }}
                PaperProps={{
                    sx: {
                        minWidth: 500,
                        minHeight: 450
                    }
                }}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='text-blue font-weight-bold' sx={{ fontSize: "28px" }}>
                    {"Change Password"}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 18,
                            top: 18,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <hr className='m-0' />
                <form onSubmit={formik.handleSubmit} autoComplete="off" className='p-3'>
                    <DialogContent className='m-0 p-2'>
                        <div>
                            <div className="px-0 mb-3">
                                <TextField
                                    className="w-100"
                                    name="currentPassword"
                                    label="Current Password"
                                    type='password'
                                    value={formik.values.currentPassword}
                                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.currentPassword ? formik.errors.currentPassword : null}
                                </div>
                            </div>
                            <div className="px-0 mb-3">
                                <TextField
                                    className="w-100"
                                    name="userPwd"
                                    label="New Password"
                                    type='password'
                                    value={formik.values.userPwd}
                                    error={formik.touched.userPwd && Boolean(formik.errors.userPwd)}
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.userPwd ? formik.errors.userPwd : null}
                                </div>
                            </div>
                            <div className="px-0 mb-2">
                                <TextField
                                    className="w-100"
                                    name="userConfirmPwd"
                                    label="Confirm Password"
                                    type='password'
                                    value={formik.values.userConfirmPwd}
                                    error={formik.touched.userConfirmPwd && Boolean(formik.errors.userConfirmPwd)}
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.userConfirmPwd ? formik.errors.userConfirmPwd : null}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className='p-0 m-0'>
                        <div className='w-100 text-right px-2'>
                            <button className='btn-create-doctor' type='submit'>Change</button>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
            <Backdrop sx={{ zIndex: 3 }} open={isLoading}>
                <Spinner />
            </Backdrop>
        </>
    )
}