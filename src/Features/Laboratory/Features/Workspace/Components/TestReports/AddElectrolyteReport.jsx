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



export default function AddElectrolyteReport(props) {
    const { report } = props;
    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        sodium: "",
        potassium: "",
        chloride: "",
        bicarbonate: "",
        calcium: "",
        magnesium: "",

    };

    const electrolyteReportSchema = Yup.object().shape({
        sodium: Yup.string()
            .trim()
            .required(" "),
        potassium: Yup.string()
            .trim()
            .required(" "),
        chloride: Yup.string()
            .trim()
            .required(" "),
        bicarbonate: Yup.string()
            .trim()
            .required(" "),
        calcium: Yup.string()
            .trim()
            .required(" "),
        magnesium: Yup.string()
            .trim()
            .required(" "),


    });

    const submitHandler = async (electrolyteCredentials) => {
        setIsLoading(true);

        const reportData = {
            sodium: electrolyteCredentials?.sodium + " mEq/L",
            potassium: electrolyteCredentials?.potassium + " mEq/L",
            chloride: electrolyteCredentials?.chloride + " mEq/L",
            bicarbonate: electrolyteCredentials?.bicarbonate + " mEq/L",
            calcium: electrolyteCredentials?.calcium + " mEq/L",
            magnesium: electrolyteCredentials?.magnesium + " mEq/L",
        }
        const param = {
            reportInformation: reportData,
            doctor: report?.doctor,
            patient: report?.patient?._id,
            laboratory: report?.laboratory,
            type: report?.type
        }
        const headers = {
            'Authorization': token,
        };
        const electrolyteReport = await addTestReport(param, headers);

        await updateTestRequestsById(report?._id, { 'status': 2 }, headers);

        if (electrolyteReport?.status) {
            notification.notify(electrolyteReport?.status, electrolyteReport?.message);
            props.handleClosePatient();
            setIsLoading(false);
        }

    };

    const AddElectrolyteReportForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: electrolyteReportSchema,
            onSubmit: (values) => {
                submitHandler(values);

            },
        });

        return (
            <div className="add-doctore-body pb-4">
                <div className="add-doctore-header px-0">
                    <h3 className="m-0 p-4 text-blue ">Add Electrolyte Test Report</h3>
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
                            <h5>Electrolyte Test Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-4 my-sm-3 my-md-1">
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="sodium"
                                    label="Sodium (Na)"
                                    value={formik.values.sodium}
                                    error={
                                        formik.touched.sodium &&
                                        Boolean(formik.errors.sodium)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.sodium
                                        ? formik.errors.sodium
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="potassium"
                                    label="Potassium (K)"
                                    value={formik.values.potassium}
                                    error={
                                        formik.touched.potassium &&
                                        Boolean(formik.errors.potassium)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.potassium
                                        ? formik.errors.potassium
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="chloride"
                                    label="Chloride (CL)"
                                    value={formik.values.chloride}
                                    error={
                                        formik.touched.chloride &&
                                        Boolean(formik.errors.chloride)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.chloride
                                        ? formik.errors.chloride
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="bicarbonate"
                                    label="Bicarbonate (HCO3)"
                                    value={formik.values.bicarbonate}
                                    error={
                                        formik.touched.bicarbonate &&
                                        Boolean(formik.errors.bicarbonate)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.bicarbonate
                                        ? formik.errors.bicarbonate
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="calcium"
                                    label="Calcium (Ca)"
                                    value={formik.values.calcium}
                                    error={
                                        formik.touched.calcium &&
                                        Boolean(formik.errors.calcium)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.calcium
                                        ? formik.errors.calcium
                                        : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="magnesium"
                                    label="Magnesium (Mg)"
                                    value={formik.values.magnesium}
                                    error={
                                        formik.touched.magnesium &&
                                        Boolean(formik.errors.magnesium)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-doctor-error-message text-right mr-1">
                                    {formik.touched.magnesium
                                        ? formik.errors.magnesium
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
                <AddElectrolyteReportForm />
            </div>
        </>
    );
}
