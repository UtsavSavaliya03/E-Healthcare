import React, { useEffect, useState } from 'react';
import './InquiryCard.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from "framer-motion";
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TitleIcon from '@mui/icons-material/Title';
import { replyEnquiry } from '../../../Services/enquiryServices.jsx';
import { FaPaperPlane } from 'react-icons/fa';
import Notificaion from '../../../../../Components/Common/Notification/Notification.jsx';
import TimeAgo from 'react-timeago';

export default function EnquiryCard(props) {

    const notification = new Notificaion;
    const [open, setOpen] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(false);
    const token = localStorage.getItem('token') || null;
    const { enquiry } = props;

    useEffect(() => {
        setAnimationDuration(true);
        return (() => {
            setAnimationDuration(false);
        })
    }, [])

    const initialValues = {
        to: enquiry?.email,
        header: 'Response to your Enquiry',
        reply: 'Thank you for reaching out.',
    };

    const EnquirySchema = Yup.object().shape({
        to: Yup.string()
            .email('')
            .trim()
            .required(' '),
        header: Yup.string()
            .trim()
            .required(' '),
        reply: Yup.string()
            .required(' '),
    })

    const submitHandler = async (EnquiryCredentials) => {

        const params = {
            enquiryId: enquiry?._id,
            header: EnquiryCredentials?.header,
            reply: EnquiryCredentials?.reply
        }

        const headers = {
            'Authorization': token
        }
        const enquiryResponse = await replyEnquiry(params, headers);
        notification.notify(enquiryResponse?.status, enquiryResponse?.message);
        if (enquiryResponse?.status) {
            setOpen(false);
            props.updateData();
        }
    }

    const EnquiryForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: EnquirySchema,
            onSubmit: (values) => {
                submitHandler(values);
            },
        });

        return (
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <div className='my-3 my-md-2'>
                    <TextField
                        className='w-100'
                        name='to'
                        id="input-with-icon-adornment"
                        placeholder='To...'
                        value={formik.values.to}
                        error={formik.touched.to && Boolean(formik.errors.to)}
                        onChange={formik.handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AlternateEmailIcon />
                                </InputAdornment>
                            ),
                            readOnly: true
                        }}
                    />
                </div>
                <div className='my-3 mt-md-3'>
                    <TextField
                        className='w-100'
                        name='header'
                        id="input-with-icon-adornment"
                        placeholder='Header'
                        value={formik.values.header}
                        error={formik.touched.header && Boolean(formik.errors.header)}
                        onChange={formik.handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TitleIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className='my-3 mt-md-3'>
                    <textarea
                        className={`w-100 enquiry-reply-body ${Boolean(formik.errors.reply) ? 'enquiry-reply-body-error' : ''}`}
                        rows={3}
                        name="reply"
                        placeholder="Response message..."
                        onChange={formik.handleChange}
                    />
                </div>
                <div className='text-right d-flex justify-content-end'>
                    <button type='submit' className='btn-send-response'>
                        <h5 className='m-0 mr-2'>Send</h5>
                        <FaPaperPlane size={20} />
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className='enquiry-collapse-container px-2 my-3'>
            <div className='row m-0 py-4' onClick={() => setOpen(!open)}>
                <div className='col-lg-2 break-line-1'>
                    <p className='m-0 card-title'>{enquiry?.fName} {enquiry?.lName}</p>
                </div>
                <div className='col-lg-3 my-1 my-lg-0'>
                    <p className='m-0 break-line-1'>{enquiry?.email}</p>
                </div>
                <div className='col-lg-4 break-line-1'>
                    <p className='m-0 text-muted'>{enquiry?.message}</p>
                </div>
                <div className='col-lg-1 text-right my-1 my-lg-0'>
                    {
                        enquiry?.status ? (
                            <p className='m-0 unread-status-tag'>
                                Unread
                            </p>
                        ) : (
                            <p className='m-0 read-status-tag'>
                                Read
                            </p>
                        )
                    }
                </div>
                <div className='col-lg-2 d-flex justify-content-end'>
                    <p className='m-0 text-muted'>
                        <TimeAgo date={enquiry?.createdAt} />
                    </p>
                    <div className='btn-toggle-container ml-4'>
                        {open ? (
                            <FaAngleUp
                                className='btn-toggle'
                                size={20}
                                onClick={() => setOpen(!open)}
                            />
                        ) : (
                            <FaAngleDown
                                className='btn-toggle'
                                size={20}
                                onClick={() => setOpen(!open)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <motion.div
                animate={{
                    height: open ? "100%" : "0px",
                    transition: {
                        duration: animationDuration ? 0.5 : 0,
                        damping: 50,
                    },
                }}
                className='body'
            >
                <AnimatePresence initial={false}>
                    <div className='pb-4'>
                        <hr className='mt-0 mb-5 mx-3' />
                        <div className='row p-0 m-0'>
                            <div className='col-lg-6 px-3'>
                                <div className='d-flex'>
                                    <p className='m-0 text-primary'>From:</p>
                                    <p className='m-0 ml-2 break-line-1'>{enquiry?.email}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='m-0 mb-1 text-primary'>Enquiry:</p>
                                    <p className='m-0'>{enquiry?.message}</p>
                                </div>
                            </div>
                            <div className='col-lg-6 px-3'>
                                {enquiry?.reply ? (
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <p className='m-0 text-primary'>Our Response</p>
                                            <p className='m-0 text-muted'>Replied: <TimeAgo date={enquiry?.updatedAt} /></p>
                                        </div>
                                        <p className='m-0 mt-2'>{enquiry?.reply}</p>
                                    </div>
                                ) : (
                                    <EnquiryForm />
                                )
                                }
                            </div>
                        </div>
                    </div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}