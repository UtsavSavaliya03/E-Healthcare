import React from "react";
import "./ContactUs.css";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { inquiry } from "../Services/InuiryServices.jsx";
import Alert from '../../../Components/Common/Alert/SweetAlert.jsx';

function ContactUs() {

  const alert = new Alert;

  const inquiryHandler = async (inquiryCredentials) => {
    const params = {
      fName: inquiryCredentials?.fName,
      lName: inquiryCredentials?.lName,
      email: inquiryCredentials?.email,
      mobileNo: (inquiryCredentials?.mobileNo).toString(),
      message: inquiryCredentials?.message,
    }
    const inquiryResponse = await inquiry(params);
    if (inquiryResponse?.status) {
      alert.alert('success', 'Done!', 'Your message sent successfully.');
    }
  };

  const SignupSchema = Yup.object().shape({
    fName: Yup.string()
      .matches(/^[A-Z]+$/i, "Allow only alphabets.")
      .trim()
      .required("Required"),
    lName: Yup.string()
      .matches(/^[A-Z]+$/i, "Allow only alphabets.")
      .trim()
      .required("Required"),
    mobileNo: Yup.string()
      .typeError("Invalid contact number")
      .trim()
      .matches(/^[1-9]{1}[0-9]{9}$/, "Invalid phone number")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address.")
      .trim()
      .required("Required"),
    message: Yup.string()
      .trim()
      .max(2000)
      .required("Required")
  });
  return (
    <div className="contactus-container row p-0 m-0" id="contactus-container">
      <div className="contact-details-container px-0 py-5 col-lg-5 col-md-6">
        <div className="px-lg-5 mx-lg-5 px-4">
          <h1 className="contact-details-title text-light my-4">
            Get in Touch with us
          </h1>
          <h5 className="contact-details-description text-light  mb-5">
            Fill up the form and our Team will get back to you within 24 hours.
          </h5>
          <div className="contact-icons-descriptions text-light d-flex flex-column">
            <div className="contact-number d-flex my-4">
              <i class="fas fa-phone-alt fa-2x contact-icons"></i>
              <p className="contact-description h4 ml-4">+91 99093 33163</p>
            </div>
            <div className="contact-email d-flex my-4">
              <i class="fas fa-envelope fa-2x contact-icons"></i>
              <p className="contact-description break-line-1 h4 ml-4">
                healthhorizon.life@gmail.com
              </p>
            </div>
            <div className="mobile-number d-flex my-4">
              <i class="fas fa-fax fa-2x contact-icons"></i>
              <p className="contact-description h4 ml-4">0261 2541814</p>
            </div>
          </div>
          <div className="contact-social-links mt-5 pt-5 d-flex justify-content-between align-items-end">
            <a href="https://www.facebook.com/profile.php?id=100091245141575" target="_blank"><i class="fab fa-facebook-f fa-2x contact-icons"></i></a>
            <a href="https://www.instagram.com/healthhorizon.life/" target="_blank"><i class="fab fa-instagram fa-2x contact-icons"></i></a>
            <a href="http://www.linkedin.com/in/Health-Horizon" target="_blank"><i class="fab fa-linkedin-in fa-2x contact-icons"></i></a>
            <a href="https://twitter.com/HealthHori18626" target="_blank"><i class="fab fa-twitter fa-2x contact-icons"></i></a>
          </div>
        </div>
      </div>
      <div className="contactus-form-container p-0 col-lg-7 col-md-6">
        <div className="contactus-form-wrapper px-lg-5">
          <Formik
            initialValues={{
              fName: "",
              lName: "",
              mobileNo: "",
              email: "",
              message: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              inquiryHandler(values);
              resetForm({ values: '' })
            }}
          >
            {({ errors, touched }) => (
              <Form
                className="contactus-form mt-5 pt-4 px-4 px-lg-5"
                autoComplete="off"
              >
                <p className="contactus-form-title h1 text-center">
                  Contact Information
                </p>
                <div className="row mb-lg-3 mt-4">
                  <div className="col-lg-6 mt-3">
                    <div
                      className={`form-control ${errors.fName && touched.fName ? "invalid-input" : ""
                        }`}
                    >
                      <Field
                        className="input-field"
                        name="fName"
                        type="text"
                        placeholder="First Name"
                      />
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="contactus-error-message text-right mr-1">
                      {errors.fName && touched.fName ? errors.fName : null}
                    </div>
                  </div>

                  <div className="col-lg-6 mt-3">
                    <div
                      className={`form-control ${errors.lName && touched.lName ? "invalid-input" : ""
                        }`}
                    >
                      <Field
                        className="input-field"
                        name="lName"
                        type="text"
                        placeholder="Last Name"
                      />
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="contactus-error-message text-right mr-1">
                      {errors.lName && touched.lName ? errors.lName : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-lg-3">
                  <div className="col-lg-6 mt-3">
                    <div
                      className={`form-control ${errors.email && touched.email ? "invalid-input" : ""
                        }`}
                    >
                      <Field
                        className="input-field"
                        name="email"
                        type="text"
                        placeholder="Email"
                      />
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div className="contactus-error-message text-right mr-1">
                      {errors.email && touched.email ? errors.email : null}
                    </div>
                  </div>

                  <div className="col-lg-6 mt-3">
                    <div
                      className={`form-control ${errors.mobileNo && touched.mobileNo
                        ? "invalid-input"
                        : ""
                        }`}
                    >
                      <Field
                        className="input-field"
                        name="mobileNo"
                        type="number"
                        min={0}
                        placeholder="Mobile Number"
                      />
                      <i class="fas fa-phone-alt"></i>
                    </div>
                    <div className="contactus-error-message text-right mr-1">
                      {errors.mobileNo && touched.mobileNo
                        ? errors.mobileNo
                        : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-lg-4">
                  <div className="col-lg-12 mt-3">
                    <div
                      className={`form-control text-area-container ${errors.message && touched.message ? "invalid-input" : ""
                        }`}
                    >
                      <Field
                        as='textarea'
                        className="input-field"
                        rows={3}
                        name="message"
                        placeholder="Message..."
                      />
                      <i class="fas fa-comment-alt"></i>
                    </div>
                    <div className="contactus-error-message text-right mr-1">
                      {errors.message && touched.message ? errors.message : null}
                    </div>
                  </div>
                  <div className="col-lg-6 mt-3 w-100"></div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn-submit mb-5">Send Message</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
