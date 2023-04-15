import React from 'react';
import './PatientProfileCard.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from 'react-avatar';


export default function PatientProfileCard(props) {

    const { patient } = props;

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
        <div className="row m-0">
            <div className='col-lg-3 col-md-6'>
                <div className='admin-patient-card-container py-4 p-0 my-3'>
                    <div className='px-4'>
                        <div className={`status-tag ${patient?.status ? 'unblock' : 'block'}`}>{patient?.status ? 'Active' : 'Blocked'}</div>
                    </div>
                    <Avatar
                        className='mt-3 mb-2 mx-auto'
                        name="Remy Sharp"
                        size='130'
                        round
                        src="https://randomuser.me/api/portraits/women/79.jpg"
                    />
                    <h3 className='pt-3 text-blue'>Ricky Park</h3>
                    <h5>rickypark@gmail.com</h5>
                    <h6 className='px-4 pt-2 text-secondary'>A - 1202, Twin Tower, AK Road, Surat, Gujarat</h6>
                    <hr />
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                        <Typography variant='h6'>Status</Typography>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} />}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    )
}
