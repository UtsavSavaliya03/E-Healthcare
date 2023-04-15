import React, { useState } from 'react';
import './PatientProfileCard.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from 'react-avatar';
import moment from 'moment';
import { updateUserStatus } from '../../../Services/patientServices'

export default function PatientProfileCard(props) {

    const { patient } = props;
    const [userStatus, setUserStatus] = useState(patient?.active);
    const token = localStorage.getItem("token") || null

    const updateUserStatusHandler = async (id, status) => {
        const headers = {
            "Authorization": token
        }
        const params = {
            id: id,
            status: !status
        }
        const updatedStatus = await updateUserStatus(params, headers)
        if (updatedStatus?.status) {
            setUserStatus(!status);
        }
    }
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
        <div className='col-lg-4 col-md-6 '>
            <div className='admin-patient-card-container py-4 p-0 my-3'>
                <div className='px-4 d-flex justify-content-between align-items-center'>
                    <div className={`status-tag ${userStatus ? 'unblock' : 'block'}`}>{userStatus ? 'Active' : 'Blocked'}</div>
                    <div>
                        <h6 className='font-weight-bold text-secondary pt-1'>Since {moment(patient?.createdAt).format("MMM, YYYY")}</h6>
                    </div>
                </div>
                <Avatar
                    className='mt-2 mb-2 mx-auto'
                    name={`${patient?.fName} ${patient?.lName}`}
                    size='120'
                    round
                    src={patient?.profileImg}
                />
                <h3 className='pt-4 text-blue'>{`${patient?.fName} ${patient?.lName}`}</h3>
                <h5 className='text-secondary font-weight-bold'>ID : {patient?.patientId}</h5>
                <h5 className='break-line-1'>{patient?.email}</h5>
                <h6 className='px-4 pt-2 text-secondary break-line-1'>{`${patient?.addressLine} ${patient?.city?.name}
                    ${patient?.state?.name}`}</h6>

                <hr />
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <Typography variant='h6' >Status</Typography>
                    <FormControlLabel onChange={() => updateUserStatusHandler(patient?._id, userStatus)}
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked={userStatus == true ? true : false} />}
                    />
                </Stack>
            </div>
        </div>

    )
}
