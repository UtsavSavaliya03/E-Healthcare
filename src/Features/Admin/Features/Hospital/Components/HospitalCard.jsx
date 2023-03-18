import React from "react";
import "./HospitalCard.css";
import { Divider } from "@mui/material";

export default function HospitalCard(props) {

  const { hospital } = props;

  return (
    <div className="col-lg-4 col-md-6">
      <div className="hospital-card-box">
        <div className="hospital-card my-3">
          <div className="front px-4">
            <h3 className="mt-4 hospital-card-title font-weight-bold break-line-1">
              {hospital?.name}
            </h3>
            <div className="mt-3">
              <p className="m-0">
                <i class="fas fa-envelope hospital-card-icon mr-3"></i>
                {hospital?.email}
              </p>
              <p className="m-0">
                <i class="fas fa-phone-alt hospital-card-icon mr-3"></i>
                +91 {hospital?.mobileNo}
              </p>
              <p className="mt-4 break-line-8">
              {hospital?.shortBio}
              </p>
            </div>
          </div>
          <div className="back px-4">
            <h3 className="mt-4 hospital-card-title font-weight-bold text-center">
              Contact Information
            </h3>
            <Divider variant="middle" />
            <div className="mt-4">
              <p className="m-0 font-weight-bold">Address :</p>
              <p className="m-0 break-line-3">{hospital?.addressLine}</p>
              <p className="m-0 mt-2 font-weight-bold">City :</p>
              <p className="m-0">{hospital?.state?.name}</p>
              <p className="m-0 mt-2 font-weight-bold">State :</p>
              <p className="m-0">{hospital?.city?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
