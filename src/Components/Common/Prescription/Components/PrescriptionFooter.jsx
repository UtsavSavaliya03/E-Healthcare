import React from "react";
import "./PrescriptionFooter.css";
import Logo from "../../../../Assets/Logos/Logo.png";

export default function Footer() {
  return (
    <div>
      <div className="px-3 px-lg-5 footer d-flex justify-content-between align-items-center py-2">
        <div className="footer-logo">
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div>
          <p className="h5 text-light m-0 font-weight-bold">&copy; HealthHorizon 2023</p>
        </div>
      </div>
    </div>
  );
}