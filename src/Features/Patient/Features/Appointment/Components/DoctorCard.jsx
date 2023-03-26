import React from "react";
import "./DoctorCard.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function DoctorCard() {
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div className="appointment-doctor-card-container">
        <div className="doctor-card-picture">
          <img
            className="img-fluid"
            src="https://picsum.photos/130/130?image=1027"
          />
        </div>
        <div className="doctor-card-content mb-3">
          <h4 className="name">Maya Mathur</h4>
          <h4 className="title">Neurologist</h4>
        </div>
        <ul className="social">
          <li>
            <a
              href="/"
              className="text-white"
              // aria-hidden="true"
            >
              Book Appointment <ArrowForwardIcon className="arrow-icon"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
