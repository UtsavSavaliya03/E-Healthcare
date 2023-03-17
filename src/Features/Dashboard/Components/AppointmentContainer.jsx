import React from "react";
import "./AppointmentContainer.css";
import PatientDashboardVector from "../../../Assets/Backgrounds/Patient-dashboard-vector.svg";
import { TypeAnimation } from "react-type-animation";

export default function Dashboard() {
  return (
    <div className="patient-dashboard-container d-flex align-items-center">
      <div className="patient-dashboard-welcome-container col-lg-6 col-md-11 ml-lg-5 p-md-5 p-4">
        <p className="display-4 patient-dashboard-welcome-title">
          Best quality treatment <br/> for
          <TypeAnimation
            sequence={[
              " Cardiology",
              1000,
              " Dentist",
              1000,
              " Neurology",
              1000,
              " Gynecology",
              1000,
              " Laboratory",
              2000,
              () => {},
            ]}
            wrapper="strong"
            cursor={true}
            repeat={Infinity}
            style={{ color: '#0b8fdc'}}
          />
        </p>
        <p className="h5 patient-dashboard-welcome-description mt-lg-4 mt-4">
          The art of medicine consists in amusing the patient while nature cures
          the disease. Treatment without prevention is simply unsustainable.
        </p>
        <button className="btnAppointment text-light mt-4">Appointment</button>
      </div>
      <div className="patient-dashboard-vector-container col-lg-5 col-md-6">
        <img
          src={PatientDashboardVector}
          className="patient-dashboard-vector-image"
          alt="patient-dashboard-img"
        />
      </div>
    </div>
  );
}
