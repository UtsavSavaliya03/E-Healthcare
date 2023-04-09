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


export default function AddLipidProfileReport(props) {
    const { report } = props;

    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        totalCholesterol: "",
        triglycerides: "",
        highDensityLipoprotein: "",
        lowDensityLipoprotein: "",
        veryLowDensityLipoprotein: "",
        hdlRatio: "",

    };

    const LipidProfileReportSchema = Yup.object().shape({
        totalCholesterol: Yup.string()
            .trim()
            .required(" "),
        triglycerides: Yup.string()
            .trim()
            .required(" "),
        highDensityLipoprotein: Yup.string()
            .trim()
            .required(" "),
        lowDensityLipoprotein: Yup.string()
            .trim()
            .required(" "),
        veryLowDensityLipoprotein: Yup.string()
            .trim()
            .required(" "),
        hdlRatio: Yup.string()
            .trim()
            .required(" "),


    });

    const submitHandler = async (lipidProfileCredentials) => {
        setIsLoading(true);

        const reportData = {
            totalCholesterol: lipidProfileCredentials?.totalCholesterol + " mg/dL",
            triglycerides: lipidProfileCredentials?.triglycerides + " mg/dL",
            highDensityLipoprotein: lipidProfileCredentials?.highDensityLipoprotein + " mg/dL",
            lowDensityLipoprotein: lipidProfileCredentials?.lowDensityLipoprotein + " mg/dL",
            veryLowDensityLipoprotein: lipidProfileCredentials?.veryLowDensityLipoprotein + " mg/dL",
            hdlRatio: lipidProfileCredentials?.hdlRatio ,


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
        const lipidProfileReport = await addTestReport(params, headers);
        await updateTestRequestsById(report?._id, { 'status': 2 }, headers);
        if (lipidProfileReport?.status) {
            notification.notify(lipidProfileReport?.status, lipidProfileReport?.message);
            props.handleClosePatient();
            setIsLoading(false);
        }

    };

    const AddLipidProfileForm = () => {

        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: LipidProfileReportSchema,
            onSubmit: (values) => {
                submitHandler(values);

            },
        });

        return (
            <div className="add-doctore-body pb-4">
                <div className="add-doctore-header px-0">
                    <h3 className="m-0 p-4 text-blue ">Add Lipid Profile Test Report</h3>
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
                            <h5>Lipid Profile Test Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-4 my-sm-3 my-md-1">
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="totalCholesterol"
                                    label="Total Cholesterol"
                                    value={formik.values.totalCholesterol}
                                    error={
                                        formik.touched.totalCholesterol &&
                                        Boolean(formik.errors.totalCholesterol)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.totalCholesterol
                                        ? formik.errors.totalCholesterol
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="triglycerides"
                                    label="Triglycerides"
                                    value={formik.values.triglycerides}
                                    error={
                                        formik.touched.triglycerides &&
                                        Boolean(formik.errors.triglycerides)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.triglycerides
                                        ? formik.errors.triglycerides
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="highDensityLipoprotein"
                                    label="High-Density Lipoprotein (HDL)"
                                    value={formik.values.highDensityLipoprotein}
                                    error={
                                        formik.touched.highDensityLipoprotein &&
                                        Boolean(formik.errors.highDensityLipoprotein)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.highDensityLipoprotein
                                        ? formik.errors.highDensityLipoprotein
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="lowDensityLipoprotein"
                                    label="Low-Density Lipoprotein (LDL)"
                                    value={formik.values.lowDensityLipoprotein1c}
                                    error={
                                        formik.touched.lowDensityLipoprotein &&
                                        Boolean(formik.errors.lowDensityLipoprotein)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.lowDensityLipoprotein
                                        ? formik.errors.lowDensityLipoprotein
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="veryLowDensityLipoprotein"
                                    label="Very Low-Density Lipoprotein (VLDL)"
                                    value={formik.values.veryLowDensityLipoprotein}
                                    error={
                                        formik.touched.veryLowDensityLipoprotein &&
                                        Boolean(formik.errors.veryLowDensityLipoprotein)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.veryLowDensityLipoprotein
                                        ? formik.errors.veryLowDensityLipoprotein
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="hdlRatio"
                                    label="HDL Ratio"
                                    value={formik.values.hdlRatio}
                                    error={
                                        formik.touched.hdlRatio &&
                                        Boolean(formik.errors.hdlRatio)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.hdlRatio
                                        ? formik.errors.hdlRatio
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
                <AddLipidProfileForm />
            </div>
        </>
    );
}
