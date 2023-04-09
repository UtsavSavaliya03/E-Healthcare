import React, { useState } from "react";
import "../../../../../Admin/Features/Laboratory/AddLaboratory.css";
import Notificaion from "../../../../../../Components/Common/Notification/Notification.jsx";
import {
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner } from "../../../../../../Components/Common/Spinners/Spinners.jsx";
import Backdrop from "@mui/material/Backdrop";
import { updateTestRequestsById, addTestReport } from '../../../../Services/laboratoryServices.jsx';




export default function AddBloodGlucoseReport(props) {
    const {report}=props;

    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        fastingPlasmaGlucose: "",
        twoHourPostprandialGlucose: "",
        randomPlasmaGlucose: "",
        hba1c: "",

    };

    const BloodGlucoseReportSchema = Yup.object().shape({
        fastingPlasmaGlucose: Yup.string()
            .trim()
            .required(" "),
        twoHourPostprandialGlucose: Yup.string()
            .trim()
            .required(" "),
        randomPlasmaGlucose: Yup.string()
            .trim()
            .required(" "),
        hba1c: Yup.string()
            .trim()
            .required(" "),


    });

    const submitHandler = async (bloodGlucoseCredentials) => {
        setIsLoading(true);

        const reportData = {
            fastingPlasmaGlucose: bloodGlucoseCredentials?.fastingPlasmaGlucose +" mg/dL",
            twoHourPostprandialGlucose: bloodGlucoseCredentials?.twoHourPostprandialGlucose +" mg/dL",
            randomPlasmaGlucose: bloodGlucoseCredentials?.randomPlasmaGlucose +" mg/dL",
            hba1c: bloodGlucoseCredentials?.hba1c +" %",

        }
        const params = {
            reportInformation: reportData,
            doctor: report?.doctor,
            patient: report?.patient?._id,
            laboratory: report?.laboratory,
            type: report?.type
        }
        const headers = {
            'Authorization': token,
        };
        const bloodGlucoseReport = await addTestReport(params, headers);

        await updateTestRequestsById(report?._id, { 'status': 2 }, headers);
        if (bloodGlucoseReport?.status) {
            notification.notify(bloodGlucoseReport?.status, bloodGlucoseReport?.message);
            props.handleClosePatient();
            setIsLoading(false);
        }
    };

    const AddBloodGlucoseForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: BloodGlucoseReportSchema,
            onSubmit: (values) => {
                submitHandler(values);

            },
        });

        return (
            <div className="add-doctore-body pb-4">
                <div className="add-doctore-header px-0">
                    <h3 className="m-0 p-4 text-blue ">Add Test Report</h3>
                    <hr className="m-0" />
                </div>
                <div className="row px-4 my-md-3">
                    <div className="col-12 body-title pt-3 pb-4 px-3">
                        <h5>Patient Information</h5>
                        <div className="horizontal-bar"></div>
                    </div>
                    <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                        <p>Name: <span className="text-blue ml-2">{`${report?.patient?.fName} ${report?.patient?.lName}`}</span></p>
                    </div>
                    <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                        <p>Age: <span className="text-blue ml-2">{report?.patient?.age}</span></p>
                    </div>
                    <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                        <p>Contact: <span className="text-blue ml-2">+91 {report?.patient?.mobileNo}</span></p>
                    </div>
                    <div className="col-12 col-lg-6 my-3 my-md-0 patient-info">
                        <p>Address: <span className="text-blue ml-2">{report?.patient?.addressLine}</span></p>
                    </div>
                    <hr className="m-0" />
                </div>

                <div>
                    <form
                        className="login-form"
                        onSubmit={formik.handleSubmit}
                        autoComplete="off"
                    >

                        <hr className="mx-3" />
                        <div className="body-title py-3 px-4">
                            <h5>Blood Glucose Test Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-4 my-sm-3 my-md-1">
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="fastingPlasmaGlucose"
                                    label="Fasting Plasma Glucose (FPG)"
                                    value={formik.values.fastingPlasmaGlucose}
                                    error={
                                        formik.touched.fastingPlasmaGlucose &&
                                        Boolean(formik.errors.fastingPlasmaGlucose)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.fastingPlasmaGlucose
                                        ? formik.errors.fastingPlasmaGlucose
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="twoHourPostprandialGlucose"
                                    label="2 Hour Postprandial Glucose"
                                    value={formik.values.twoHourPostprandialGlucose}
                                    error={
                                        formik.touched.twoHourPostprandialGlucose &&
                                        Boolean(formik.errors.twoHourPostprandialGlucose)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.twoHourPostprandialGlucose
                                        ? formik.errors.twoHourPostprandialGlucose
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="randomPlasmaGlucose"
                                    label="Random Plasma Glucose"
                                    value={formik.values.randomPlasmaGlucose}
                                    error={
                                        formik.touched.randomPlasmaGlucose &&
                                        Boolean(formik.errors.randomPlasmaGlucose)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.randomPlasmaGlucose
                                        ? formik.errors.randomPlasmaGlucose
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="hba1c"
                                    label="HbA1c"
                                    value={formik.values.hba1c}
                                    error={
                                        formik.touched.hba1c &&
                                        Boolean(formik.errors.hba1c)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.hba1c
                                        ? formik.errors.hba1c
                                        : null}
                                </div>
                            </div>
                        </div>
                        <hr className="mx-3 mb-4" />
                        <div className='w-100 text-right px-5'>
                            <button className='btn-create-doctor' type='submit'>Add</button>
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
                <AddBloodGlucoseForm />
            </div>
        </>
    );
}
