import React, { useState } from "react";
import "./GeneratePrescription.css";
import { useFormik } from "formik";
import { doseData, intakeTimeData } from '../../../../Constant/Prescription/PrescriptionDetails.jsx';
import {
    TextField,
    FormControlLabel,
    RadioGroup,
    FormLabel,
    Radio,
    FormControl,
    MenuItem
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Notificaion from "../../../../Components/Common/Notification/Notification.jsx";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function GeneratePrescription() {
    const notification = new Notificaion();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || null;

    const generateId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const [medicineData, setMedicineData] = useState([
        { id: 'MEDICINE', name: '', qty: 0, dose: '', time: '' }
    ]);

    const addMedicine = () => {
        setMedicineData([...medicineData, { id: generateId(), name: '', qty: 0, dose: '', time: '' }])
    }

    const onChangeHandler = (event, id) => {
        medicineData?.map((medicine) => {
            if (medicine?.id === id) {
                setMedicineData([{ [event.target.name]: event.target.value, ...medicine }, ...medicineData])
            }
        })
    }

    const removeMedicine = (id) => {
        let updatedArray = medicineData?.filter((medicine) => {
            if (medicine?.id !== id) {
                return medicine;
            }
        })
        setMedicineData(updatedArray);
    }

    const PrescriptionSchema = Yup.object().shape({
        fname: Yup.string().trim().required(" "),
        lname: Yup.string().trim().required(" "),
        mobileNo: Yup.string().trim().required(" "),
    });

    const initialValues = {
        fname: "",
        lname: "",
        mobileNo: "",
        suggestion: "",
        medicineName: "",
        medicineQty: "",
        medicineDose: "",
        intakeTime: ""
    };

    const submitHandler = async (departmentCredentials) => {
        const params = {
            name: departmentCredentials?.name,
            description: departmentCredentials?.description,
            status: departmentCredentials?.status === "false" ? false : true,
        };

        const headers = {
            Authorization: token,
        };
        // const department = await addDepartment(departmentCredentials, headers);
        // notification.notify(department?.status, department?.message);
        // if (department?.status) {
        //   navigate('/main/department-list');
        // }
    };

    const AddPrescriptionForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: PrescriptionSchema,
            onSubmit: (values) => {
                submitHandler(values);
            },
        });

        return (
            <div className="add-department-card p-4">

                <div className="add-department-header px-0">
                    <h3 className="m-0 py-2 px-3">Add Prescription</h3>
                    <hr className="m-0" />
                </div>
                <div className="px-2">
                    <form onSubmit={formik.handleSubmit} autoComplete="off">

                        <div className="body-title py-3 px-3">
                            <h5>Personal Information</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-3 my-md-1">
                            <div className="col-12 col-lg-4 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="fname"
                                    label="First Name"
                                    value={formik.values.fname}
                                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <div className="add-hospital-error-message text-right mr-1">
                                    {formik.touched.fname ? formik.errors.fname : null}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="lname"
                                    label="Last Name"
                                    value={formik.values.lname}
                                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <div className="add-hospital-error-message text-right mr-1">
                                    {formik.touched.lname ? formik.errors.lname : null}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 my-3 my-md-0">
                                <TextField
                                    className="w-100"
                                    name="mobileNo"
                                    label="Mobile No"
                                    value={formik.values.mobileNo}
                                    error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <div className="add-hospital-error-message text-right mr-1">
                                    {formik.touched.mobileNo ? formik.errors.mobileNo : null}
                                </div>
                            </div>
                            <div className="col-12 my-3 my-md-0">
                            </div>


                        </div>

                        <div className="body-title py-3 px-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Medicine Information</h5>
                                <div className="horizontal-bar"></div>
                            </div>
                            <IconButton className="btn-add-medicine" onClick={addMedicine} >
                                <AddIcon />
                            </IconButton>
                        </div>
                        <div>
                            {
                                medicineData?.map((medicine, index) => (
                                    <div className="row px-3 my-4">
                                        <div className="col-12 col-lg-4 my-3 my-md-0">
                                            <TextField
                                                className="w-100"
                                                name="name"
                                                label="Medicine Name"
                                                value={medicine?.name}
                                                onChange={(e) => { onChangeHandler(e, medicine?.id) }}
                                            />
                                            {/* <div className="add-hospital-error-message text-right mr-1">
                                                {formik.touched.medicineName ? formik.errors.medicineName : null}
                                            </div> */}
                                        </div>
                                        <div className="col-12 col-lg-2 my-3 my-md-0">
                                            <TextField
                                                className="w-100"
                                                name="qty"
                                                label="Medicine Quantity"
                                                value={medicine?.qty}
                                                onChange={(e) => { onChangeHandler(e, medicine?.id) }}
                                            />
                                            {/* <div className="add-hospital-error-message text-right mr-1">
                                                {formik.touched.medicineQty ? formik.errors.medicineQty : null}
                                            </div> */}
                                        </div>
                                        <div className="col-12 col-lg-2 my-3 my-md-0">
                                            <TextField
                                                className="w-100"
                                                name="dose"
                                                label="Medicine Dose"
                                                select
                                                value={medicine?.dose}
                                                onChange={(e) => { onChangeHandler(e, medicine?.id) }}
                                            >
                                                {
                                                    doseData?.map((dose, index) => (
                                                        <MenuItem key={index} value={dose?.value}>{dose?.label}</MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                            {/* <div className="add-hospital-error-message text-right mr-1">
                                                {formik.touched.medicineDose ? formik.errors.medicineDose : null}
                                            </div> */}
                                        </div>
                                        <div className="col-12 col-lg-3 my-3 my-md-0">
                                            <TextField
                                                className="w-100"
                                                name="time"
                                                label="Intake Time"
                                                select
                                                value={medicine?.time}
                                                onChange={(e) => { onChangeHandler(e, medicine?.id) }}
                                            >
                                                {
                                                    intakeTimeData?.map((intakeTime, index) => (
                                                        <MenuItem key={index} value={intakeTime?.value}>{intakeTime?.label}</MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                            {/* <div className="add-hospital-error-message text-right mr-1">
                                                {formik.touched.intakeTime ? formik.errors.intakeTime : null}
                                            </div> */}
                                        </div>
                                        <div className="col-1 my-3 my-md-0 text-right pr-3">
                                            <IconButton className="btn-remove-medicine mt-2" onClick={() => {
                                                removeMedicine(medicine?.id)
                                            }}>
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="body-title py-3 px-3">
                            <h5>Additional Suggestion</h5>
                            <div className="horizontal-bar"></div>
                        </div>
                        <div className="row px-3 my-md-1">
                            <div className="col-12 my-3 my-md-0">
                                <TextField
                                    multiline
                                    rows={5}
                                    className="w-100"
                                    name="suggestion"
                                    label="Suggestion"
                                    value={formik.values.suggestion}
                                    error={
                                        formik.touched.suggestion &&
                                        Boolean(formik.errors.suggestion)
                                    }
                                    onChange={formik.handleChange}
                                />
                                <div className="add-hospital-error-message text-right mr-1">
                                    {formik.touched.suggestion
                                        ? formik.errors.suggestion
                                        : null}
                                </div>
                            </div>
                        </div>


                        <div className="w-100 text-right px-4">
                            <button className="btn-create-department" type="submit">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="add-department-container py-4 px-5">
                <AddPrescriptionForm />
            </div>
        </div>
    );
}