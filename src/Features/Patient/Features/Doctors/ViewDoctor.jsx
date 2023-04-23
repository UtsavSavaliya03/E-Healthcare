import React, { useEffect, useState } from "react";
import "./ViewDoctor.css";
import { fetchDoctorById } from "../../Services/doctorServices";
import { useNavigate, useLocation } from "react-router-dom";
import profilePicture from "../../../../Assets/Icons/user.png";
import {
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "moment";
import {
  sidebarStateAtom,
  selectedDoctorStateAtom
} from "../../../../Store/globalState.jsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Spinner } from "../../../../Components/Common/Spinners/Spinners.jsx";
import { Helmet } from "react-helmet";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ViewDoctor() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const doctorId = atob(pathArray[3]) || null;
  const isSidebarOpen = useRecoilValue(sidebarStateAtom);
  const token = localStorage.getItem("token") || null;
  const [doctor, setDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileImg, setProfileImg] = useState(profilePicture);
  const setSelectedDoctor = useSetRecoilState(selectedDoctorStateAtom);

  const bookAppointmentHandler = () => {
    setSelectedDoctor(doctor);
    navigate('/patient/book-appointment');
  }

  const fetchDoctorHandler = async () => {
    setIsLoading(true);

    const headers = {
      'Authorization': token,
    };

    const doctor = await fetchDoctorById(doctorId, headers);
    setDoctor(doctor?.data);

    if (!doctor?.status) {
      navigate("/patient/doctors");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctorHandler();
  }, []);

  useEffect(() => {
    if (doctor?.profileImg) {
      setProfileImg(doctor?.profileImg);
    } else {
      setProfileImg(profilePicture);
    }
  }, [doctor]);

  const DisplayDoctorInformation = () => {
    return (
      <div className="fade-in">
        <div className="row px-4 pb-lg-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">First Name</p>
            <p className="value m-0">{doctor?.fName}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Last Name</p>
            <p className="value m-0">{doctor?.lName}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Personal Email</p>
            <p className="value break-line-1 m-0">{doctor?.email}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Mobile Number</p>
            <p className="value m-0">{doctor?.mobileNo}</p>
          </div>
        </div>

        <div className="row px-4 py-md-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Department</p>
            <p className="value m-0">{doctor?.department?.name}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Experience</p>
            <p className="value m-0">
              {doctor?.experience}{" "}
              {`${doctor?.experience > 1 ? "Years" : "Year"}`}
            </p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Date Of Birth</p>
            <p className="value m-0">
              {moment(doctor.dateOfBirth).format("LL")}
            </p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Blood Group</p>
            <p className="value m-0">{doctor?.bloodGroup}</p>
          </div>
        </div>

        <div className="row px-4 py-md-3">
          <div className="col-12 my-3 my-md-0">
            <p className="label m-0">Gender</p>
            <p className="value m-0">{doctor?.gender}</p>
          </div>
        </div>

        <div className="row px-4 py-lg-3">
          <div className="col-12 my-3 my-md-0">
            <p className="value m-0">Short Biography</p>
            <p className="text-muted m-0">{doctor?.shortBio}</p>
          </div>
        </div>

        <hr className="mx-3" />
        <div className="body-title py-3 px-4">
          <h5>Contact Information</h5>
          <div className="horizontal-bar"></div>
        </div>

        <div className="row px-4 py-lg-3">
          <div className="col-sm-6 my-3 my-md-0">
            <p className="label m-0">Address</p>
            <p className="value break-line-1 m-0">{doctor?.addressLine}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Country</p>
            <p className="value m-0">{doctor?.country?.name}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">State</p>
            <p className="value m-0">{doctor?.state?.name || "---"}</p>
          </div>
        </div>

        <div className="row px-4 py-md-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">City</p>
            <p className="value m-0">{doctor?.city?.name || "---"}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">Pincode</p>
            <p className="value m-0">{doctor?.pincode}</p>
          </div>
        </div>

        <hr className="mx-3" />
        <div className="body-title py-3 px-4">
          <h5>Working Place</h5>
          <div className="horizontal-bar"></div>
        </div>
        <div className="row px-4 py-md-3">
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">State Of Hospital</p>
            <p className="value m-0">{doctor?.hospital?.state?.name}</p>
          </div>
          <div className="col-sm-3 my-3 my-md-0">
            <p className="label m-0">City Of Hospital</p>
            <p className="value m-0">{doctor?.hospital?.city?.name}</p>
          </div>
          <div className="col-sm-6 my-3 my-md-0">
            <p className="label m-0">Hospital</p>
            <p className="value m-0">{doctor?.hospital?.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>{`Dr. ${doctor?.fName} ${doctor?.lName}` || 'Doctor'} | Health Horizon</title>
      </Helmet>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="add-doctore-container pt-lg-4 px-lg-5 py-3 px-3">
          <div>
            <div className="view-doctore-profile">
              <div className="row py-4">
                <div className="col-sm-12 col-lg-2 py-2 px-5">
                  <div className="doctor-profile-img-container">
                    <img className="doctor-profile-img" src={profileImg} />
                  </div>
                </div>
                <div className={`col-sm-12 col-lg-10 pr-lg-5 px-5 mt-md-3 mt-lg-0 ${isSidebarOpen ? "pl-lg-4" : "pl-lg-2"}`}>
                  <div className="pb-3 d-flex justify-content-between">
                    <div>
                      <h4 className="title m-0">{`${doctor?.fName} ${doctor?.lName}`}</h4>
                      <div className="d-flex justify-content-start align-items-center">
                        <p className="value m-0 break-line-1">{doctor?.email}</p>
                        <div className="doctor-card-copy-icon ml-1">
                          <IconButton
                            size="small"
                            onClick={() => {
                              navigator.clipboard.writeText(doctor?.email);
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <button
                        className="btn-book-appointment align-items-center d-flex text-white"
                        onClick={bookAppointmentHandler}
                      >
                        <span>Book an appointment</span> 
                        <ArrowForwardIcon className="ml-2"/>
                      </button>
                    </div>
                  </div>
                  <p className="text-muted m-0">{doctor?.shortBio}</p>
                </div>
              </div>
            </div>

            <div className="view-doctore-edit-container my-5 pb-5">
              <div className="body-title py-3 px-4 d-flex justify-content-between align-items-center">
                <div>
                  <h5>About</h5>
                  <div className="horizontal-bar"></div>
                </div>
              </div>
              <DisplayDoctorInformation />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
