import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    MenuItem
} from "@mui/material";
import { genderData } from "../../../../Constant/ProfileDetails/GenderDetails.jsx";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import { useRecoilState } from 'recoil';
import { userState } from '../../../../Store/globalState';
import Notificaion from "../../../../Components/Common/Notification/Notification.jsx";
import { updatePatient } from '../../../Patient/Services/userServices.jsx';

let State = require("country-state-city").State;
let City = require("country-state-city").City;

export default function ProfileModal(props) {

    const [user, setUser] = useRecoilState(userState);
    const notification = new Notificaion();

    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        age: '',
        gender: null,
        addressLine: '',
        state: null,
        city: null,
        pincode: "",
    };

    const ProfileDetailsSchema = Yup.object().shape({
        age: Yup.string()
            .trim()
            .required(" "),
        gender: Yup.string().required(" "),
        addressLine: Yup.string()
            .required(" "),
        state: Yup.object().required(" "),
        city: Yup.object().required(" "),
        pincode: Yup.string()
            .typeError("Invalid pincode")
            .trim()
            .matches(/^[1-9]{1}[0-9]{5}$/, "Invalid pincode")
            .required(" "),
    });

    const submitHandler = async (profileCredentials, { resetForm }) => {
        setIsLoading(true);

        const params = {
            age: profileCredentials?.age,
            gender: profileCredentials?.gender,
            addressLine: profileCredentials?.addressLine,
            state: JSON.stringify(profileCredentials?.state),
            city: JSON.stringify(profileCredentials?.city),
            pincode: profileCredentials?.pincode,
        }

        const headers = {
            'Authorization': token,
        };

        const userProfile = await updatePatient(user._id, params, headers);
        if (userProfile?.status) {
            setUser(userProfile?.data)
            props.modalHandler(false);
            resetForm();
        }
        notification.notify(userProfile?.status, userProfile?.message);
        setIsLoading(false);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ProfileDetailsSchema,
        onSubmit: (values, { resetForm }) => {
            submitHandler(values, { resetForm });
        },
    });

    return (
        <>
            <Dialog
                PaperProps={{
                    sx: {
                        minWidth: 800,
                        minHeight: 600
                    }
                }}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form
                    className="login-form"
                    onSubmit={formik.handleSubmit}
                    autoComplete="off"
                >
                    <DialogTitle id="alert-dialog-title" className='text-blue font-weight-bold' sx={{ fontSize: "28px" }}>
                        {"Let's complete your profile!"}
                    </DialogTitle>
                    <DialogContent className='m-0'>
                        <hr className="m-0" />
                        <div className="body-title pt-4 pb-2">
                            <h5>Personal Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row my-sm-3 my-md-1 py-3">
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="age"
                                    label="Age"
                                    value={formik.values.age}
                                    error={
                                        formik.touched.age &&
                                        Boolean(formik.errors.age)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.age ? formik.errors.age : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
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
                        <div className="body-title pb-2">
                            <h5>Address Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row my-sm-3 my-md-1 py-3">
                            <div className="col-12 col-md-6 my-3 my-md-0">
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
                            <div className="col-12 col-md-6 my-3 my-md-0">
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
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="city"
                                    label="City"
                                    select
                                    value={formik.values.city}
                                    error={
                                        formik.touched.city &&
                                        Boolean(formik.errors.city)
                                    }
                                    onChange={formik.handleChange}
                                >
                                    {City.getCitiesOfState(
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
                                    {formik.touched.city
                                        ? formik.errors.city
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="pincode"
                                    label="Pincode"
                                    value={formik.values.pincode}
                                    error={
                                        formik.touched.pincode &&
                                        Boolean(formik.errors.pincode)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.pincode
                                        ? formik.errors.pincode
                                        : null}
                                </div>
                            </div>
                        </div>
                        <hr className="p-0 m-0" />
                    </DialogContent>
                    <DialogActions>
                        <div className='w-100 text-right px-5'>
                            <button className='btn-create-doctor' type='submit'>Finish</button>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
            <Backdrop sx={{ zIndex: 1 }} open={isLoading}>
                <Spinner />
            </Backdrop>
        </>
    )
}
