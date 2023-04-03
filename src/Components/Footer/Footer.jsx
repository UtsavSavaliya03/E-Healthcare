import React from "react";
import "./Footer.css";
import Logo from "../../Assets/Logos/Logo.png";
import useHeader from '../Header/Hooks/useHeader.jsx';

export default function Footer() {

  const isVisibleHeader = useHeader();

  return (
    <div>
      {isVisibleHeader && (
        <div className="px-3 px-lg-5 footer d-flex justify-content-between align-items-center py-2">
          <div className="footer-logo">
            <a href="/">
              <img src={Logo} alt="logo" />
            </a>
          </div>
          <div className="footer-link-wrapper-container">
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
      )}
    </div>
  );
}
