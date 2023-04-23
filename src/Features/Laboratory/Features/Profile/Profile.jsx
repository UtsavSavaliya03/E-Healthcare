import React from 'react';
import './Profile.css';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../Store/globalState';
import LaboratoryIcon from "../../../../Assets/Icons/LaboratoryIcon.png";
import { Helmet } from 'react-helmet';

export default function Profile() {

  const user = useRecoilValue(userState);

  return (
    <div className='py-3 px-4'>
      <Helmet>
        <title>My Account | Laboratory</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="row m-0 view-hospital-card">
        <div className="col-12 text-center pt-5 pb-3">
          <div className="pl-2">
            <h1 className="text-blue text-center font-weight-bold ml-4 view-hospital-title my-0 break-line-1">
              {user?.name}
            </h1>
          </div>
          <hr className="mt-5" />
        </div>
        <div className="col-lg-3 col-md-6 p-md-5">
          <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
            Details
          </h3>
          <p className="font-weight-bold h5">Contact No :</p>
          <p className="h5">+91 {user?.mobileNo}</p>
          <p className="font-weight-bold h5 mt-md-4">Email :</p>
          <p className="h5">{user?.email}</p>
        </div>
        <div className="col-lg-5 col-md-6 p-md-5 mt-4 mt-md-0">
          <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
            About Us
          </h3>
          <p className="h5">{user?.shortBio}</p>
        </div>
        <div className="col-lg-4 col-md-12 p-md-5 py-5 py-md-0 view-hospital-profile-container text-light d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <img
              src={LaboratoryIcon}
              alt="Laboratory Icon"
              className="hospital-icon"
            />
          </div>
          <div>
            <h2 className="font-weight-bold mb-5 text-center">
              {user.name}
            </h2>
            <p className="font-weight-bold h5">Address Line :</p>
            <p className="h5">{user?.addressLine}</p>
            <p className="font-weight-bold h5 mt-4">City :</p>
            <p className="h5">{user?.city?.name}</p>
            <p className="font-weight-bold h5 mt-4">State :</p>
            <p className="h5">{user?.state?.name}</p>
            <p className="font-weight-bold h5 mt-4">Pincode :</p>
            <p className="h5">{user?.pincode}</p>
          </div>
        </div>
      </div>
    </div>
  )
}