import React, { useState, useRef } from "react";
import "./Newsletter.css";
import NewsletterEmailLogo from "../../../Assets/Icons/Newsletter-email-logo.png";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { newsletter } from "../Services/InuiryServices.jsx";
import Alert from '../../../Components/Common/Alert/SweetAlert.jsx';

function Newsletter() {

  const alert = new Alert;
  const emailInput = useRef(null);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const newsletterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .trim()
      .required('Email address is required'),
  })

  const newsletterHandler = async (newsletterParams, { resetForm }) => {
    const newsletterResponse = await newsletter(newsletterParams);
    if (newsletterResponse?.status) {
      resetForm({ values: '' });
      alert.alert('success', 'Done!', 'Subscribed Ssccessfully!');
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 2000)
    }
  }

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
          <Formik
            initialValues={{ email: '' }}
            validationSchema={newsletterSchema}
            onSubmit={async (values, { resetForm }, e) => {
              newsletterHandler(values, { resetForm }, e);
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off">
                <div className={`${((errors.email) && (touched.email)) || invalidEmail ? 'newsletter-invalid-input' : ''}`}>
                  <div className="newsletter-form-input my-lg-5">
                    <Field
                      name="email"
                      type="text"
                      placeholder="What's your email?"
                      onKeyDown={(e)=>{if (e.key === 'Enter') e.preventDefault();}}
                    ></Field>
                    <button type="submit">
                      <i class="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
