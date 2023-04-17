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
import DeleteIcon from '@mui/icons-material/Delete';
import { replyInquiry, deleteInquiry } from '../../../Services/inquiryServices.jsx';
import { FaPaperPlane } from 'react-icons/fa';
import Notificaion from '../../../../../Components/Common/Notification/Notification.jsx';
import TimeAgo from 'react-timeago';
import IconButton from '@mui/material/IconButton';
import Alert from '../../../../../Components/Common/Alert/SweetAlert.jsx';

export default function InquiryCard(props) {

    const alert = new Alert();
    const notification = new Notificaion;
    const [open, setOpen] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(false);
    const token = localStorage.getItem('token') || null;
    const { inquiry } = props;

    useEffect(() => {
        setAnimationDuration(true);
        return (() => {
            setAnimationDuration(false);
        })
    }, [])

    const initialValues = {
        to: inquiry?.email,
        header: 'Response to your Inquiry',
        reply: 'Thank you for reaching out.',
    };

    const InquirySchema = Yup.object().shape({
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

    const deleteHandler = async (e) => {
        props.deleteLoaderHandler(true);

        const headers = {
            'Authorization': token
        }

        const inquiryResponse = await deleteInquiry(inquiry?._id, headers);

        if (inquiryResponse) {
            alert.alert('success', 'Done!', 'Deleted Ssccessfully!');
            props.updateData(inquiry?._id);
            props.deleteLoaderHandler(false);
        }
    }

    const submitHandler = async (InquiryCredentials) => {

        const params = {
            inquiryId: inquiry?._id,
            header: InquiryCredentials?.header,
            reply: InquiryCredentials?.reply
        }

        const headers = {
            'Authorization': token
        }
        const inquiryResponse = await replyInquiry(params, headers);
        notification.notify(inquiryResponse?.status, inquiryResponse?.message);
        if (inquiryResponse?.status) {
            setOpen(false);
            props.updateData();
        }
    }

    const openDeletePopup = (e) => {
        e.stopPropagation();
        if (inquiry?.status) {
            alert.confirmBox('Are you sure?', "This inquiry is still not responded and also you won't be able to revert this!", { deleteHandler })
        } else {
            alert.confirmBox('Are you sure?', "You won't be able to revert this!", { deleteHandler })
        }
    }

    const InquiryForm = () => {
        const formik = useFormik({
            initialValues: initialValues,
            validationSchema: InquirySchema,
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
                        className={`w-100 inquiry-reply-body ${Boolean(formik.errors.reply) ? 'inquiry-reply-body-error' : ''}`}
                        rows={3}
                        name="reply"
                        value={formik.values.reply}
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
        <div className='inquiry-collapse-container px-2 my-3'>
            <div className='row m-0 py-4' onClick={() => setOpen(!open)}>
                <div className='col-lg-2 break-line-1'>
                    <p className='m-0 card-title'>{inquiry?.fName} {inquiry?.lName}</p>
                </div>
                <div className='col-lg-3 my-1 my-lg-0'>
                    <p className='m-0 break-line-1'>{inquiry?.email}</p>
                </div>
                <div className='col-lg-4 break-line-1'>
                    <p className='m-0 text-muted'>{inquiry?.message}</p>
                </div>
                <div className='col-lg-1 text-right my-1 my-lg-0'>
                    {
                        inquiry?.status ? (
                            <p className='m-0 unread-status-tag'>
                                Unread
                            </p>
                        ) : (
                            <p className='m-0 read-status-tag'>
                                Answered
                            </p>
                        )
                    }
                </div>
                <div className='col-lg-2 d-flex justify-content-end btn-container'>
                    <p className='m-0 text-muted break-line-1'>
                        <TimeAgo date={inquiry?.createdAt} />
                    </p>
                    <div className='ml-2'>
                        <IconButton
                            size="small"
                            onClick={(e) => { openDeletePopup(e) }}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <div className='btn-toggle-container ml-2'>
                        {open ? (
                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                <FaAngleUp />
                            </IconButton>
                        ) : (
                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                <FaAngleDown />
                            </IconButton>
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
                                    <p className='m-0 ml-2 break-line-1'>{inquiry?.email}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='m-0 mb-1 text-primary'>Inquiry:</p>
                                    <p className='m-0'>{inquiry?.message}</p>
                                </div>
                            </div>
                            <div className='col-lg-6 px-3'>
                                {inquiry?.reply ? (
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <p className='m-0 text-primary'>Our Response</p>
                                            <p className='m-0 text-muted'>Replied: <TimeAgo date={inquiry?.updatedAt} /></p>
                                        </div>
                                        <p className='m-0 mt-2'>{inquiry?.reply}</p>
                                    </div>
                                ) : (
                                    <InquiryForm />
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