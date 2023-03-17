import React from "react";
import "./HospitalCard.css";
import { Divider } from "@mui/material";

export default function HospitalCard() {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="hospital-card-box">
        <div className="hospital-card">
          <div className="front px-4">
            <h3 className="mt-4 hospital-card-title font-weight-bold text-center">
              Texas Hospital
            </h3>
            <div className="mt-3">
              <p className="m-0">
                <i class="fas fa-envelope hospital-card-icon mr-2"></i>{" "}
                kaushalnavapara@hmail.com
              </p>
              <p className="m-0">
                <i class="fas fa-phone-alt hospital-card-icon mr-2"></i> +91
                9939078772
              </p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae repellat deleniti veniam itaque, sunt aspernatur
                aliquam odit perspiciatis vero culpa voluptatum adipisci
                recusandae.
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
              <p className="m-0">69, Lake-garden street</p>
              <p className="m-0 mt-2 font-weight-bold">City :</p>
              <p className="m-0">Surat</p>
              <p className="m-0 mt-2 font-weight-bold">State :</p>
              <p className="m-0">Gujarat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
