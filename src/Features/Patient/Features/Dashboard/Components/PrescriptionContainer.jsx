import React from 'react';
import "./PrescriptionContainer.css";
import { useRecoilValue } from 'recoil';
import { sidebarStateAtom } from '../../../../../Store/globalState.jsx';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionContainer() {

  const isOpenSidebar = useRecoilValue(sidebarStateAtom);
  const navigate = useNavigate()

  return (
    <div className={`prescription-container-wrapper ${isOpenSidebar ? 'prescription-container-wrapper-md' : 'prescription-container-wrapper-lg'}`}>
      <div className='prescription-container row m-0 d-flex text-light'>
        <div className="prescription-content col-lg-5 col-md-10 my-lg-5 py-lg-5 p-4 ml-md-4">
          <p className='h1 mr-lg-5'>View Your E-Prescriptions <br />Anytime, Anywhere</p>
          <button className='btnLetsGo mt-lg-5 mt-md-5' onClick={()=>navigate("/patient/my-prescriptions")}>Let's Go!</button>
        </div>
      </div>
    </div>
  )
}
