import React from 'react';
import './DoctorCard.css';
import Avatar from 'react-avatar';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { editDoctorStateAtom } from '../../../../../Store/globalState.jsx';
import { useSetRecoilState } from 'recoil';

export default function DoctorCard(props) {

    const doctor = props.doctor;
    const navigate = useNavigate();
    const setEnableEdit = useSetRecoilState(editDoctorStateAtom);

    return (
        <div className='col-lg-4 col-sm-12'>
            <div className='doctor-card-container py-3 p-0 my-3'>
                <div className="doctor-card-header px-3">
                    <div className='d-flex justify-content-start align-items-center'>
                        <Avatar size='50' round name={`${doctor?.fName} ${doctor?.lName}`} />
                        <div className='ml-3'>
                            <h4 className='header-title m-0'>{`${doctor?.fName} ${doctor?.lName}`}</h4>
                            <div className='d-flex justify-content-start align-items-center'>
                                <p className='value m-0 break-line-1'>{doctor?.email}</p>
                                <div className='doctor-card-copy-icon'>
                                    <IconButton
                                        size="small"
                                        onClick={() => { navigator.clipboard.writeText('test@gmail.com') }}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='doctor-card-body px-3'>
                    <div className='row'>
                        <div className="col-6 pr-0">
                            <p className='label m-0'>Department</p>
                            <p className='value m-0'>{doctor?.department}</p>
                        </div>
                        <div className="col-6 pr-0">
                            <p className='label m-0'>Experience</p>
                            <p className='value m-0'>{doctor?.experience} {`${doctor?.experience > 1 ? 'Years' : 'Year'}`}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className="col-6 pr-0">
                            <p className='label m-0'>Gander</p>
                            <p className='value m-0'>{doctor?.gender}</p>
                        </div>
                        <div className="col-6 pr-0">
                            <p className='label m-0'>Date Of Birth</p>
                            <p className='value m-0'>{moment(doctor.dateOfBirth).format('LL')}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className="col-6 pr-0">
                            <p className='label m-0'>Blood Group</p>
                            <p className='value m-0'>{doctor?.bloodGroup}</p>
                        </div>
                        <div className="col-6 pr-0">
                            <p className='label m-0'>Country</p>
                            <p className='value m-0'>{doctor?.country?.name}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center px-3'>
                    <div className='btn-view-profile'>
                        <Button
                            onClick={() => (navigate(`/main/view-doctor/${btoa(doctor?._id)}`))}
                        >
                            View Profile
                        </Button>
                    </div>
                    <div className='doctor-card-header-button-container'>
                        <IconButton
                            onClick={() => {
                                setEnableEdit(true);
                                navigate(`/main/view-doctor/${btoa(doctor?._id)}`);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton className='ml-2'>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}