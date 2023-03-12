import React from "react";
import "./MainContainer.css";
import logo from "../../../Assets/Logos/Logo.png";
import { useNavigate } from "react-router";

function MainContainer() {
  const navigate = useNavigate();

  return (
    <div className="main-container m-0 p-0">
      <div className="landing-navbar-container">
        <a className="navbar-brand mx-md-5 mx-3" href="/">
          <img src={logo} className="logo-img" alt="Logo" />
        </a>
        <div className="landing-navbar-link">
          <a className="text-light px-4" href="/">
            Home
          </a>
          <a className="text-light px-4" href="/login">
            Login
          </a>
          <a className="text-light px-4" href="/signup">
            Signup
          </a>
          <a className="text-light px-4" href="#contactus-container">
            Contact Us
          </a>
        </div>
        <div className="bar-container">
          <i class="fas fa-bars fa-2x pr-4"></i>
          <div className="dropdown">
            <div className="dropdown-content">
              <a className="text-light px-4" href="/">
                Home
              </a>
              <a className="text-light px-4" href="/login">
                Login
              </a>
              <a className="text-light px-4" href="/signup">
                Signup
              </a>
              <a className="text-light px-4" href="#contactus-container">
                Contact Us
              </a>
            </div>
          </div>
        </div>
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
