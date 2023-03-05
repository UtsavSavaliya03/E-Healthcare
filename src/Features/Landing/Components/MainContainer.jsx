import React from "react";
import "./MainContainer.css";
import logo from "../../../Assets/Logo.png";
import { useNavigate } from "react-router";

function MainContainer() {
  const navigate = useNavigate();

  return (
    <div className="main-container m-0 p-0">
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand mx-lg-5" href="/">
            <img src={logo} className="logo-img" alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse landing-nav-links mx-5 d-flex justify-content-end"
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light mx-4 px-3 active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light mx-4 px-3" href="/">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light mx-4 px-3" href="/">
                  Signup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light mx-4 px-3" href="/">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="px-0 text-light ml-lg-5 mt-lg-5 pt-lg-5 px-md-4">
        <div className="ml-lg-4 col-lg-5 text-left pb-1">
          <p className="landing-title">
            Your Health, <br /> Our Priority
          </p>
          <div className="description-container mb-xl-5 pb-xl-4">
            <p className="my-xl-4">
              We are here to provide easy access to healthcare services and
              information online to the citizens of the nation, start your
              wellness journey with us.
            </p>
          </div>
          <button
            className="btnGetStarted mt-2 mb-5"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
