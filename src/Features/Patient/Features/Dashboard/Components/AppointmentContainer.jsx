import React from "react";
import "./AppointmentContainer.css";
import PatientDashboardVector from "../../../../../Assets/Backgrounds/Patient-dashboard-vector.svg";
import { TypeAnimation } from "react-type-animation";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDepartments } from "../../../../Admin/Services/departmentServices.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const token = localStorage.getItem("token") || null;

  const fetchDepartmentsHandler = async () => {
    const headers = {
      'Authorization': token,
    };

    const departmentsResponse = await fetchDepartments(headers);
    await departmentsResponse?.department?.map((department) => {
      if (departments.length < 11) {
        let newDepartment = [];
        newDepartment.push(department?.name);
        newDepartment.push(2000);
        setDepartments((current) => [...current, ...newDepartment]);
      }
    });
  };

  useEffect(() => {
    fetchDepartmentsHandler();
  }, []);

  return (
    <div className="patient-dashboard-container d-flex align-items-center">
      <div className="patient-dashboard-welcome-container col-lg-6 col-md-11 ml-lg-5 p-md-5 p-4">
        <p className="display-4 patient-dashboard-welcome-title">
          Best quality treatment <br /> for
          {departments?.length > 0 ? (
            <TypeAnimation
              className="ml-3"
              sequence={departments}
              wrapper="strong"
              cursor={true}
              repeat={Infinity}
              style={{ color: "#0b8fdc" }}
            />
          ) : (
            <span> Loading Departments</span>
          )}
        </p>
        <p className="h5 patient-dashboard-welcome-description mt-lg-4 mt-4">
          The art of medicine consists in amusing the patient while nature cures
          the disease. Treatment without prevention is simply unsustainable.
        </p>
        <button
          className="btnAppointment text-light mt-4"
          onClick={() => navigate("/patient/book-appointment")}
        >
          Appointment
        </button>
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
