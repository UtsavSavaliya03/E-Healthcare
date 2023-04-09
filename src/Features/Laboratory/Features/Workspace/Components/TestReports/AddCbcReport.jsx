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


export default function AddCbcReport(props) {
    const {report}=props;

    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        hemoglobin: "",
        hematocrit: "",
        redBloodCellCount: "",
        meanCorpuscularVolume: "",
        meanCorpuscularHemoglobin: "",
        meanCorpuscularHemoglobinConcentration: "",
        whiteBloodCellCount: "",
        plateletCount: "",
    };

    const CbcReportSchema = Yup.object().shape({
        hemoglobin: Yup.string()
            .trim()
            .required(" "),
        hematocrit: Yup.string()
            .trim()
            .required(" "),
        redBloodCellCount: Yup.string()
            .trim()
            .required(" "),
        meanCorpuscularVolume: Yup.string()
            .trim()
            .required(" "),
        meanCorpuscularHemoglobin: Yup.string()
            .trim()
            .required(" "),
        meanCorpuscularHemoglobinConcentration: Yup.string()
            .trim()
            .required(" "),
        whiteBloodCellCount: Yup.string()
            .trim()
            .required(" "),
        plateletCount: Yup.string()
            .trim()
            .required(" "),

    });

    const submitHandler = async (cbcCredentials) => {
        setIsLoading(true);

        const reportData = {
            hemoglobin: cbcCredentials?.hemoglobin+" g/dL" ,
            hematocrit: cbcCredentials?.hematocrit +" %",
            redBloodCellCount: cbcCredentials?.redBloodCellCount +" /uL",
            meanCorpuscularVolume: cbcCredentials?.meanCorpuscularVolume +" fL",
            meanCorpuscularHemoglobin: cbcCredentials?.meanCorpuscularHemoglobin +" pg/cell",
            meanCorpuscularHemoglobinConcentration: cbcCredentials?.meanCorpuscularHemoglobinConcentration +" g/dL",
            whiteBloodCellCount: cbcCredentials?.whiteBloodCellCount +" /uL",
            plateletCount: cbcCredentials?.plateletCount +" /uL",
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
        const cbcReport = await addTestReport(params, headers);

        await updateTestRequestsById(report?._id, { 'status': 2 }, headers);
        if (cbcReport?.status) {
            notification.notify(cbcReport?.status, cbcReport?.message);
            props.handleClosePatient();
            setIsLoading(false);
        }
    };

    const AddCbcForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: CbcReportSchema,
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
                            <h5>Compelete Blood Count Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-4 my-sm-3 my-md-1">
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="hemoglobin"
                                    label="Hemoglobin (Hb)"
                                    value={formik.values.hemoglobin}
                                    error={
                                        formik.touched.hemoglobin &&
                                        Boolean(formik.errors.hemoglobin)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.hemoglobin
                                        ? formik.errors.hemoglobin
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="hematocrit"
                                    label="Hematocrit (Hct)"
                                    value={formik.values.hematocrit}
                                    error={
                                        formik.touched.hematocrit &&
                                        Boolean(formik.errors.hematocrit)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.hematocrit
                                        ? formik.errors.hematocrit
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="redBloodCellCount"
                                    label="Red Blood Cell Count (RBC)"
                                    value={formik.values.redBloodCellCount}
                                    error={
                                        formik.touched.redBloodCellCount &&
                                        Boolean(formik.errors.redBloodCellCount)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.redBloodCellCount
                                        ? formik.errors.redBloodCellCount
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="meanCorpuscularVolume"
                                    label="Mean Corpuscular Volume (MCV)"
                                    value={formik.values.meanCorpuscularVolume}
                                    error={
                                        formik.touched.meanCorpuscularVolume &&
                                        Boolean(formik.errors.meanCorpuscularVolume)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.meanCorpuscularVolume
                                        ? formik.errors.meanCorpuscularVolume
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="meanCorpuscularHemoglobin"
                                    label="Mean Corpuscular Hemoglobin (MCH)"
                                    value={formik.values.meanCorpuscularHemoglobin}
                                    error={
                                        formik.touched.meanCorpuscularHemoglobin &&
                                        Boolean(formik.errors.meanCorpuscularHemoglobin)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.meanCorpuscularHemoglobin
                                        ? formik.errors.meanCorpuscularHemoglobin
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="meanCorpuscularHemoglobinConcentration"
                                    label="Mean Corpuscular Hemoglobin Concentration (MCHC)"
                                    value={formik.values.meanCorpuscularHemoglobinConcentration}
                                    error={
                                        formik.touched.meanCorpuscularHemoglobinConcentration &&
                                        Boolean(formik.errors.meanCorpuscularHemoglobinConcentration)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.meanCorpuscularHemoglobinConcentration
                                        ? formik.errors.meanCorpuscularHemoglobinConcentration
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="whiteBloodCellCount"
                                    label="White Blood Cell Count (WBC)"
                                    value={formik.values.whiteBloodCellCount}
                                    error={
                                        formik.touched.whiteBloodCellCount &&
                                        Boolean(formik.errors.whiteBloodCellCount)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.whiteBloodCellCount
                                        ? formik.errors.whiteBloodCellCount
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="plateletCount"
                                    label="Platelet Count"
                                    value={formik.values.plateletCount}
                                    error={
                                        formik.touched.plateletCount &&
                                        Boolean(formik.errors.plateletCount)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.plateletCount
                                        ? formik.errors.plateletCount
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
                <AddCbcForm />
            </div>
        </>
    );
}
