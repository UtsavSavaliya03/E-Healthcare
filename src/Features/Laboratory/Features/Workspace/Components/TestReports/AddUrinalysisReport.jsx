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


export default function AddUrinalysisReport(props) {
    const { report } = props;

    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        color: "",
        appearance: "",
        specificGravity: "",
        ph: "",
        redBloodCells: "",
        whiteBloodCells: "",

    };

    const urinalysisReportSchema = Yup.object().shape({
        color: Yup.string()
            .trim()
            .required(" "),
        appearance: Yup.string()
            .trim()
            .required(" "),
        specificGravity: Yup.string()
            .trim()
            .required(" "),
        ph: Yup.string()
            .trim()
            .required(" "),
        redBloodCells: Yup.string()
            .trim()
            .required(" "),
        whiteBloodCells: Yup.string()
            .trim()
            .required(" "),


    });

    const submitHandler = async (urineCredentials) => {
        setIsLoading(true);

        const reportData = {
            color: urineCredentials?.color,
            appearance: urineCredentials?.appearance,
            specificGravity: urineCredentials?.specificGravity,
            ph: urineCredentials?.ph,
            redBloodCells: urineCredentials?.redBloodCells + " /hpf",
            whiteBloodCells: urineCredentials?.whiteBloodCells + " /hpf",


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
        const urinalysisReport = await addTestReport(params, headers);

        await updateTestRequestsById(report?._id, { 'status': 2 }, headers);
        if (urinalysisReport?.status) {
            notification.notify(urinalysisReport?.status, urinalysisReport?.message);
            props.handleClosePatient();
            setIsLoading(false);
        }


    };

    const AddUrinalysisReportForm = () => {


        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: urinalysisReportSchema,
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
                            <h5>Urinalysis Test Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-4 my-sm-3 my-md-1">
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="color"
                                    label="Color"
                                    value={formik.values.color}
                                    error={
                                        formik.touched.color &&
                                        Boolean(formik.errors.color)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.color
                                        ? formik.errors.color
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="appearance"
                                    label="Appearance"
                                    value={formik.values.appearance}
                                    error={
                                        formik.touched.appearance &&
                                        Boolean(formik.errors.appearance)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.appearance
                                        ? formik.errors.appearance
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="specificGravity"
                                    label="Specific Gravity"
                                    value={formik.values.specificGravity}
                                    error={
                                        formik.touched.specificGravity &&
                                        Boolean(formik.errors.specificGravity)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.specificGravity
                                        ? formik.errors.specificGravity
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="ph"
                                    label="pH"
                                    value={formik.values.ph}
                                    error={
                                        formik.touched.ph &&
                                        Boolean(formik.errors.ph)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.ph
                                        ? formik.errors.ph
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="redBloodCells"
                                    label="Red Blood Cells (RBC)"
                                    value={formik.values.redBloodCells}
                                    error={
                                        formik.touched.redBloodCells &&
                                        Boolean(formik.errors.redBloodCells)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.redBloodCells
                                        ? formik.errors.redBloodCells
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="whiteBloodCells"
                                    label="White Blood Cells (WBC)"
                                    value={formik.values.whiteBloodCells}
                                    error={
                                        formik.touched.whiteBloodCells &&
                                        Boolean(formik.errors.whiteBloodCells)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.whiteBloodCells
                                        ? formik.errors.whiteBloodCells
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
                <AddUrinalysisReportForm />
            </div>
        </>
    );
}
