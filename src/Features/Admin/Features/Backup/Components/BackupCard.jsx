import React from 'react';
import './BackupCard.css';
import { FaDownload } from "react-icons/fa";
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

export default function BackupCard(props) {

    const { data } = props;
    const { title } = props;

    let date = new Date()
    const initialValues = {
        dateFrom: moment().subtract(date.getDate(), 'days').format("YYYY-MM-DD"),
        dateTo: moment(new Date()).format("YYYY-MM-DD")
    }

    const BackuoSchema = Yup.object().shape({
        dateFrom: Yup.date()
            .min('01-01-2023', 'Date must be later than 01-01-2023')
            .max(moment(new Date()).format("YYYY-MM-DD"), "Date must be at earlier than today's date")
            .required(' '),
        dateTo: Yup.date()
            .min(initialValues?.dateFrom)
            .max(moment(new Date()).format("YYYY-MM-DD"), "Date must be at earlier than today's date")
            .required(' '),
    })

    const backupHandler = (params) => {
        console.log(params);
    }

    const BackupForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: BackuoSchema,
            onSubmit: (values) => {
                backupHandler(values);
            },
        });

        return (
            <form className='login-form' onSubmit={formik.handleSubmit} autoComplete="off">
                <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                        <TextField
                            type='date'
                            className='w-100 date-input'
                            name='dateFrom'
                            label='From'
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={formik.values.dateFrom}
                            error={formik.touched.dateFrom && Boolean(formik.errors.dateFrom)}
                            onChange={formik.handleChange}
                        />
                        <div className='add-doctor-error-message text-right mr-1'>
                            {(formik.touched.dateFrom) ? (formik.errors.dateFrom) : null}
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4'>
                        <TextField
                            type='date'
                            className='w-100 date-input'
                            name='dateTo'
                            label='To'
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={formik.values.dateTo}
                            error={formik.touched.dateTo && Boolean(formik.errors.dateTo)}
                            onChange={formik.handleChange}
                        />
                        <div className='add-doctor-error-message text-right mr-1'>
                            {(formik.touched.dateTo) ? (formik.errors.dateTo) : null}
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-4 mt-1'>
                        <button className='btn-export align-items-center' type='submit'>
                            <FaDownload className='mr-3 pt-1' />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <div className='backup-card m-0 mt-4 w-100'>
            <div>
                <h4 className='font-weight-bold'>{title}</h4>
                <hr className='mb-4' />
            </div>
            <div className='w-100 pt-2'>
                <BackupForm />
            </div>
        </div>
    )
}