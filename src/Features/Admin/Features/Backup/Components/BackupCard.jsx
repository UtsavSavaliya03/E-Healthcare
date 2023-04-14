import React, { useState, useRef } from 'react';
import './BackupCard.css';
import { FaDownload } from "react-icons/fa";
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { backup } from '../../../Services/backupServices';
import Backdrop from "@mui/material/Backdrop";
import { Spinner } from '../../../../../Components/Common/Spinners/Spinners.jsx';
import Notificaion from '../../../../../Components/Common/Notification/Notification.jsx';
import { downloadCSV } from '../../../../../Services/CsvServices';


export default function BackupCard(props) {

    const { title } = props;
    const notification = new Notificaion;
    const token = localStorage.getItem('token') || null;
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalidDate, setIsInvalidDate] = useState(false);

    let date = new Date();
    const initialValues = {
        dateFrom: moment().subtract(date.getDate() === 1 ? date.getDate() : date.getDate() - 1, 'days').format("YYYY-MM-DD"),
        dateTo: moment(new Date()).format("YYYY-MM-DD")
    }

    const BackuoSchema = Yup.object().shape({
        dateFrom: Yup.date()
            .min('01-01-2023', 'Date must be later than 01-01-2023')
            .max(moment(new Date()).format("YYYY-MM-DD"), "Date must be at earlier than today's date")
            .required(' '),
        dateTo: Yup.date()
            .max(moment(new Date()).format("YYYY-MM-DD"), "Date must be at earlier than today's date")
            .required(' '),
    });

    const backupHandler = async (params) => {
        validateDate(params);
        const headers = {
            'Authorization': token
        }
        const backupResponse = await backup(title, params, headers)

        let csvData = [];
        let counter = 0;

        if (backupResponse?.data?.length < 1) {
            notification.notify(false, 'No data available in this range!');
        }
        backupResponse?.data?.map((user) => {
            const newUser = Object.assign({}, user);
            if (user?.country || user?.state) {
                if (user?.country) {
                    newUser['country'] = JSON.stringify(user.country);
                }
                newUser['state'] = JSON.stringify(user.state);
                newUser['city'] = JSON.stringify(user.city);
            }
            csvData.push(newUser);

            if (++counter === backupResponse?.data?.length) {
                downloadCSV(`${title}_From_${params?.dateFrom}_To_${params?.dateTo}`, csvData);
                setIsLoading(false);
            }
        })

        if (!(backupResponse?.status)) {
            notification.notify(backupResponse?.status, backupResponse?.message);
            setIsLoading(false);
        }
    }

    const validateDate = (dateFrom, dateTo) => {
        var msDiff = new Date(dateTo).getTime() - new Date(dateFrom).getTime();
        var isValidDate = Math.floor(msDiff / (1000 * 60 * 60 * 24));

        if (isValidDate < 0) {
            setIsInvalidDate(true);
        } else {
            setIsInvalidDate(false);
        }
    }

    const BackupForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: BackuoSchema,
            onSubmit: (values) => {
                backupHandler(values);
            },
        });

        validateDate(formik.values.dateFrom, formik.values.dateTo);

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
        <div className='backup-card m-0 mt-5 w-100'>
            <Backdrop
                sx={{ zIndex: 1 }}
                open={isLoading}
            >
                <Spinner />
                <div className='ml-4'>
                    <h4 className='text-primary'>Generating CSV file...</h4>
                </div>
            </Backdrop>
            <div>
                <h4 className='font-weight-bold title'>{title}</h4>
                <hr className='mb-4' />
            </div>
            <div className='w-100 pt-1'>
                <BackupForm />
            </div>
        </div>
    )
}