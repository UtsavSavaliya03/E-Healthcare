import React from "react";
import "./ServiceCard.css";

function ServiceCard(props) {

  const service = props.service;

  return (
    <div className="card text-center servicecard-container my-4 mx-lg-5 mx-md-4">
      <div className="title">
        <i className={`${service?.icon}`} aria-hidden='true'></i>
        <h2>{service?.title}</h2>
      </div>
      <div className="option mt-3">
        <ul>
          <li>{service?.description}</li>
        </ul>
      </div>
    </div>
  );
}

export default ServiceCard;
