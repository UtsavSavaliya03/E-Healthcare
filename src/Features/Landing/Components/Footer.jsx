import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container text-light">
      <div className="container pt-lg-4">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="footer-about">
              <h3>About Us</h3>
              <div className="usefullink-container">
                <p>
                  Our mission is to provide innovative digital solutions that
                  transform the healthcare experience for patients and
                  providers. We are committed to leveraging technology to
                  improve access to care, and drive operational efficiency
                  across the healthcare industry
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-8">
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <div className="footer-link">
                  <h3>Service Area</h3>
                  <div className="usefullink-container">
                    <a>Hospitals</a>
                    <a>Laboratories</a>
                    <a>Doctors</a>
                    <a>Patients</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="footer-link">
                  <h3>Useful Link</h3>
                  <div className="usefullink-container">
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                    <a href="#contactus-container">Contact Us</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 px-lg-0">
                <div className="footer-contact">
                  <h3>Get In Touch</h3>
                  <div className="usefullink-container">
                    <p>
                      <i className="fa fa-phone-alt" />
                      +91 99093 33163
                    </p>
                    <p>
                      <i className="fa fa-envelope" />
                      healthhorizon.life@gmail.com
                    </p>
                    <div className="footer-social">
                      <a href="https://twitter.com/HealthHori18626" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=100091245141575" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="https://www.instagram.com/healthhorizon.life/" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="http://www.linkedin.com/in/Health-Horizon" target="_blank">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <div className="row">
          <div className="col-12 text-center">
            <p>
              ©<a href="/">Health Horizon</a>, All Right Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
