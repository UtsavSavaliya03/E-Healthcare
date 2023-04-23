import React, { useEffect } from "react";
import "./ViewHospital.css";
import HospitalIcon from "../../../../Assets/Icons/Hospital-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchHospitalById } from "../../Services/hospitalServices.jsx";
import { useState } from "react";
import Avatar from "react-avatar";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import { Helmet } from "react-helmet";


export default function ViewHospital() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathArray = location.pathname.split("/");
  const token = localStorage.getItem("token") || null;
  const hospitalId = atob(pathArray[3]) || null;
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHospitalHandler = async () => {
    setIsLoading(true);

    const headers = {
      'Authorization': token,
    };

    const hospitals = await fetchHospitalById(hospitalId, headers);
    setHospitals(hospitals.data?.hospital);
    setDoctors(hospitals.data?.doctors);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHospitalHandler();
  }, []);

  const avatarCard = (doctor, index) => {
    return (
      <div className="col-lg-4 col-md-3 col-12 my-3 doctor-detail-box d-flex " key={index} onClick={() => (navigate(`/patient/view-doctor/${btoa(doctor?._id)}`))}>
        <div className="dpt-doctor-img-container">
          <Avatar
            src={doctor?.profileImg}
            name={`${doctor?.fName} ${doctor?.lName}`}
            round={true}
            size={55}
          />
        </div>
        <div className="dpt-doctor-info ml-2">
          <h5 className="font-weight-bold doctor-name break-line-1">{`${doctor?.fName} ${doctor?.lName}`}</h5>
          <h6 className="break-line-1">{doctor?.email}</h6>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 view-hospital-container">
      <Helmet>
        <title>{hospitals.name || 'Hospital'} | Health Horizon</title>
      </Helmet>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="row m-0 view-hospital-card mb-5">
            <div className="col-12 text-center pt-5 pb-3">
              <div className="d-flex align-items-center justify-content-center pl-2">
                <h1 className="text-blue text-center font-weight-bold ml-4 view-hospital-title my-0">
                  Hospital Profile
                </h1>

              </div>
              <hr className="mt-5" />
            </div>
            <div className="col-lg-3 col-md-6 p-md-5">
              <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
                Details
              </h3>
              <p className="font-weight-bold h5">Contact No :</p>
              <p className="h5">{hospitals?.mobileNo}</p>
              <p className="font-weight-bold h5 mt-md-4">Email :</p>
              <p className="h5">{hospitals?.email}</p>
            </div>
            <div className="col-lg-5 col-md-6 p-md-5 mt-4 mt-md-0">
              <h3 className="font-weight-bold text-blue mb-4 mb-md-5">
                About Us
              </h3>
              <p className="h5">{hospitals?.shortBio}</p>
            </div>
            <div className="col-lg-4 col-md-12 p-md-5 py-5 py-md-0 view-hospital-profile-container text-light d-flex justify-content-center align-items-center flex-column">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <img
                  src={HospitalIcon}
                  alt="Hospital Icon"
                  className="hospital-icon"
                />
              </div>
              <div>
                <h2 className="font-weight-bold mb-5 text-center">
                  {hospitals.name}
                </h2>
                <p className="font-weight-bold h5">Address Line :</p>
                <p className="h5">{hospitals?.addressLine}</p>
                <p className="font-weight-bold h5 mt-4">City :</p>
                <p className="h5">{hospitals?.city?.name}</p>
                <p className="font-weight-bold h5 mt-4">State :</p>
                <p className="h5">{hospitals?.state?.name}</p>
              </div>
            </div>
          </div>
          <div className="p-md-5 department-doctor-container">
            <div className="body-title p-3">
              <h3 className="font-weight-bold text-blue">Doctors in this hospital</h3>
              <div className="horizontal-bar"></div>
            </div>
            <div>
              {
                doctors?.length > 0 ? (
                  <div className="row p-3">
                    {doctors.map((doctor, index) => (
                      avatarCard(doctor, index)
                    ))}
                  </div>
                ) : (
                  <div className="w-100 p-3">
                    <h5 className="m-0 text-muted text-center">No Doctors</h5>
                  </div>
                )
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}
