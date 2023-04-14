import React, { useState } from 'react';
import './Profile.css';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../Store/globalState';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from "@mui/icons-material/Clear";
import moment from 'moment';

export default function Profile() {

  const [user, setUser] = useRecoilState(userState);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <div className='py-3 px-4 profile-container'>
      <div className='profile-card fade-in'>
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='text-blue p-3 m-0'>My Account</h3>
          {
            enableEdit ? (
              <IconButton
                className='mr-3'
                onClick={() => setEnableEdit(false)}
              >
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton
                className='mr-3 btn-edit-hospital'
                onClick={() => setEnableEdit(true)}
              >
                <EditIcon />
              </IconButton>
            )
          }
        </div>
        <hr className='m-0' />

        <div>
          {
            enableEdit ? (
              <div className='pb-lg-5 fade-in'>

              </div>
            ) : (
              <div className='pb-lg-5 fade-in'>
                <div className="body-title py-3 px-4">
                  <h5>Personal Information</h5>
                  <div className="horizontal-bar"></div>
                </div>

                <div className="row px-4 pb-lg-3">
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">First Name</p>
                    <p className="value m-0">{user?.fName}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Last Name</p>
                    <p className="value m-0">{user?.lName}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Personal Email</p>
                    <p className="value break-line-1 m-0">{user?.email}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Mobile Number</p>
                    <p className="value m-0">{user?.mobileNo}</p>
                  </div>
                </div>

                <div className="row px-4 py-md-3">
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Department</p>
                    <p className="value m-0">{user?.department?.name}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Experience</p>
                    <p className="value m-0">
                      {user?.experience}{" "}
                      {`${user?.experience > 1 ? "Years" : "Year"}`}
                    </p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Date Of Birth</p>
                    <p className="value m-0">
                      {moment(user.dateOfBirth).format("LL")}
                    </p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Blood Group</p>
                    <p className="value m-0">{user?.bloodGroup}</p>
                  </div>
                </div>

                <div className="row px-4 py-md-3">
                  <div className="col-12 my-3 my-md-0">
                    <p className="label m-0">Gender</p>
                    <p className="value m-0">{user?.gender}</p>
                  </div>
                </div>

                <div className="row px-4 py-lg-3">
                  <div className="col-12 my-3 my-md-0">
                    <p className="value m-0">Short Biography</p>
                    <p className="text-muted m-0">{user?.shortBio}</p>
                  </div>
                </div>

                <hr className="mx-3" />
                <div className="body-title py-3 px-4">
                  <h5>Contact Information</h5>
                  <div className="horizontal-bar"></div>
                </div>

                <div className="row px-4 py-lg-3">
                  <div className="col-12 my-3 my-md-0">
                    <p className="label m-0">Address</p>
                    <p className="value break-line-1 m-0">{user?.addressLine}</p>
                  </div>
                </div>

                <div className="row px-4 py-md-3">
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Country</p>
                    <p className="value m-0">{user?.country?.name}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">State</p>
                    <p className="value m-0">{user?.state?.name || "---"}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">City</p>
                    <p className="value m-0">{user?.city?.name || "---"}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">Pincode</p>
                    <p className="value m-0">{user?.pincode}</p>
                  </div>
                </div>

                <hr className="mx-3" />
                <div className="body-title py-3 px-4">
                  <h5>Working Place</h5>
                  <div className="horizontal-bar"></div>
                </div>
                <div className="row px-4 py-md-3">
                  <div className="col-sm-6 my-3 my-md-0">
                    <p className="label m-0">Hospital</p>
                    <p className="value m-0">{user?.hospital?.name}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">State Of Hospital</p>
                    <p className="value m-0">{user?.hospital?.state?.name}</p>
                  </div>
                  <div className="col-sm-3 my-3 my-md-0">
                    <p className="label m-0">City Of Hospital</p>
                    <p className="value m-0">{user?.hospital?.city?.name}</p>
                  </div>
                </div>

              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}
