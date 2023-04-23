import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import AppointmentContainer from './Components/AppointmentContainer.jsx';
import FacilityCardContainer from './Components/FacilityCardContainer.jsx';
import PrescriptionContainer from './Components/PrescriptionContainer.jsx';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../Store/globalState';
import { Helmet } from "react-helmet";


export default function Dashboard() {

  const user = useRecoilValue(userState);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const modalHandler = (val) => {
    setOpenProfileModal(val);
  }

  useEffect(() => {
    if (user) {
      if (!(user?.pincode)) {
        setOpenProfileModal(true);
      }
    }
  }, [])

  return (
    <div className='user-dashboard-container'>
      <Helmet>
        <title>Home | Health Horizon</title>
      </Helmet>
      <ProfileModal open={openProfileModal} modalHandler={modalHandler} />
      <AppointmentContainer />
      <PrescriptionContainer />
      <FacilityCardContainer />
    </div>
  )
}
