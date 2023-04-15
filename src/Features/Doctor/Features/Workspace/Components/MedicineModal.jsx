import React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { doseData, intakeTimeData, medicinesData } from '../../../../../Constant/Prescription/PrescriptionDetails.jsx';
import {
    TextField,
    MenuItem
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';

export default function MedicineModal(props) {

    const generateId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const initialMedicine = {
        name: '',
        qty: '',
        dose: '',
        time: ''
    };

    const MedicineSchema = Yup.object().shape({
        name: Yup.string().trim().required(" "),
        qty: Yup.number().min(0).required(" "),
        dose: Yup.string().trim().required(" "),
        time: Yup.string().trim().required(" "),
    });

    const submitHandler = (medicine) => {
        const id = generateId();
        props.addMedicine({ id: id, ...medicine });
    }

    const AddMedicineForm = () => {
        const formik = useFormik({
            initialValues: initialMedicine,
            validationSchema: MedicineSchema,
            onSubmit: (values) => {
                submitHandler(values);
            },
        });

        return (
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="row px-4 my-4">
                    <div className="col-12 col-lg-4 my-3 my-md-0">
                        <TextField
                            className={`w-100 medicine-name ${formik.errors.name ? 'medicine-input' : ''}`}
                            name="name"
                            label="Medicine Name"
                            select
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        >
                            {
                                medicinesData?.map((medicine, index) => (
                                    <MenuItem key={index} value={medicine?.value}>{medicine?.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <div className="add-hospital-error-message text-right mr-1">
                            {formik.touched.name ? formik.errors.name : null}
                        </div>
                    </div>
                    <div className="col-12 col-lg-2 my-3 my-md-0">
                        <TextField
                            className={`w-100 ${formik.errors.qty ? 'medicine-input' : ''}`}
                            name="qty"
                            type='number'
                            label="Medicine Quantity"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            value={formik?.values?.qty}
                            onChange={formik.handleChange}
                        />
                        <div className="add-hospital-error-message text-right mr-1">
                            {formik.touched.qty ? formik.errors.qty : null}
                        </div>
                    </div>
                    <div className="col-12 col-lg-2 my-3 my-md-0 prescription-selector">
                        <TextField
                            className={`w-100 ${formik.errors.dose ? 'medicine-input' : ''}`}
                            name="dose"
                            label="Medicine Dose"
                            select
                            value={formik?.values?.dose}
                            onChange={formik.handleChange}
                        >
                            {
                                doseData?.map((dose, index) => (
                                    <MenuItem key={index} value={dose?.value}>{dose?.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <div className="add-hospital-error-message text-right mr-1">
                            {formik.touched.dose ? formik.errors.dose : null}
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 my-3 my-md-0">
                        <TextField
                            className={`w-100 ${formik.errors.time ? 'medicine-input' : ''}`}
                            name="time"
                            label="Intake Time"
                            select
                            value={formik?.values?.time}
                            onChange={formik.handleChange}
                        >
                            {
                                intakeTimeData?.map((intakeTime, index) => (
                                    <MenuItem key={index} value={intakeTime?.value}>{intakeTime?.label}</MenuItem>
                                ))
                            }
                        </TextField>
                        <div className="add-hospital-error-message text-right mr-1">
                            {formik.touched.time ? formik.errors.time : null}
                        </div>
                    </div>
                    <div className="col-1 my-3 my-md-0 text-left">
                        <IconButton
                            className="btn-add-medicine mt-2"
                            type='submit'
                        >
                            <DoneIcon />
                        </IconButton>
                    </div>
                </div>
            </form>
        )
    }

    return (<AddMedicineForm />)
}
