import React from "react";
import "./Newsletter.css";
import NewsletterEmailLogo from "../../../Assets/Newsletter-email-logo.png";

function Newsletter() {
  return (
    <div className="newsletter-main-container d-flex justify-content-center flex-column row px-2 py-3 m-0">
      <div className="newsletter-container text-center mt-5 pt-2 col-lg-6 col-md-10 offset-md-1 offset-lg-3 px-0">
        <div className="newsletter-email-logo-container px-5 mx-auto">
          <img src={NewsletterEmailLogo} alt="Email-Symbol" className="" />
        </div>
        <p className="h1 mt-4">
          SUBSCRIBE TO <strong>NEWSLETTER</strong>
        </p>
        <p className="h4 text-secondary my-4">
          Stay tuned to be updated with all the upcoming events and never miss
          our new services, latest news, etc
        </p>

        <div className="newsletter-form-container pb-4">
          <div className="newsletter-form-input my-lg-5">
            <input
              className=""
              type="email"
              placeholder="What's your email?"
            ></input>
            <button type="submit">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
