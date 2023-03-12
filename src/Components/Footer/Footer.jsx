import React from "react";
import "./Footer.css";
import Logo from "../../Assets/Logo.png";

export default function Footer() {
  return (
    <div>
      <footer className="container-fluid footer d-flex justify-content-around text-lg-start py-2">
        <div className="footer-logo d-flex justify-content-start">
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className="w-25 py-3">
          <div className="d-flex footer-link-wrapper-container justify-content-around">
            <a href="/">
              <i className="fab fa-twitter" />
            </a>
            <a href="/">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="/">
              <i className="fab fa-youtube" />
            </a>
            <a href="/">
              <i className="fab fa-instagram" />
            </a>
            <a href="/">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
