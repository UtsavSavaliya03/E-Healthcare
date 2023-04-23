import React from "react";
import "./Newsletter.css";
import NewsletterEmailLogo from "../../../../Assets/Icons/Newsletter-email-logo.png";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { sendMail } from "../../Services/newsletterServices.jsx";
import Alert from "../../../../Components/Common/Alert/SweetAlert.jsx";
import { Helmet } from "react-helmet";

export default function Newsletter() {

  const alert = new Alert();
  const token = localStorage.getItem("token") || null;

  const NewsletterSchema = Yup.object().shape({
    subject: Yup.string().trim().required("Subject is required"),
    message: Yup.string()
      .min(10, "Message is too short")
      .trim()
      .required("No Message provided"),
  });

  const newsletterReplyHandler = async (mailContent, { resetForm }) => {
    const headers = {
      'Authorization': token,
    };
    const newsletters = await sendMail(mailContent, headers);
    if (newsletters.status) {
      alert.alert("success", "Done!", "Newsletter sent successfully!");
      resetForm();
    }
  };

  return (
    <div className="newsletter-mail-form-container  p-0 m-0">
      <Helmet>
        <title>Newsletter | Health Horizon</title>
      </Helmet>
      <div className="row m-0 p-0">
        <p className="h1 text-center newsletter-mail-form-title font-weight-bold text-secondary py-2 pt-5 col-12">
          Welcome to SendBox!
        </p>
        <div className="col-md-6 px-5 py-1 d-flex justify-content-center align-items-center">
          <img
            src={NewsletterEmailLogo}
            alt="NewsletterEmailLogo"
            className="NewsletterEmailLogo"
          />
        </div>
        <div className="col-md-6 newsletter-form-container d-flex justify-content-center align-items-center py-5">
          <Formik
            initialValues={{ subject: "", message: "" }}
            validationSchema={NewsletterSchema}
            onSubmit={async (values, { resetForm }) => {
              newsletterReplyHandler(values, { resetForm });
            }}
          >
            {({ errors, touched }) => (
              <Form className="newsletter-form mt-5" autoComplete="off">
                <div className="mb-4 mt-4">
                  <div
                    className={`form-control ${errors.subject && touched.subject ? "invalid-input" : ""
                      }`}
                  >
                    <Field
                      className="input-field title-container"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                    />
                    <i class="fas fa-text-height"></i>
                  </div>
                  <div className="login-error-message text-right mr-3">
                    {errors.subject && touched.subject ? errors.subject : null}
                  </div>
                </div>

                <div>
                  <div
                    className={`form-control text-area-container ${errors.message && touched.message ? "invalid-input" : ""
                      }`}
                  >
                    <Field
                      as="textarea"
                      className="input-field message-container"
                      rows={5}
                      name="message"
                      placeholder="Message..."
                    />
                    <i class="fas fa-comment-alt"></i>
                  </div>
                  <div className="contactus-error-message text-right mr-1">
                    {errors.message && touched.message ? errors.message : null}
                  </div>
                </div>

                <button className="btn-submit">Send</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
