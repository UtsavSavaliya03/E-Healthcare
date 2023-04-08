import React from "react";
import "./DoctorCard.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Avatar from "react-avatar";

export default function DoctorCard(props) {

  const { doctor } = props;

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div className="appointment-doctor-card-container">
        <div className="doctor-card-picture align-items-center">
          <Avatar round className="user-avatar" name={`${doctor?.fName} ${doctor?.lName}`} src={doctor?.profileImg} />
        </div>
        <div className="doctor-card-content mb-3">
          <h4 className="name text-blue break-line-1 px-2">{`Dr. ${doctor?.fName} ${doctor?.lName}`}</h4>
          <h5 className="">{doctor?.department?.name}</h5>
        </div>
        <ul className="social">
          <li>
            <button className="btn-book-appointment" onClick={() => props.setDoctor(doctor)}>
              Book an appointment <ArrowForwardIcon className="arrow-icon" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
