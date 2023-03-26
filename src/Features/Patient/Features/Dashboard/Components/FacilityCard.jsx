import React from "react";
import "./FacilityCard.css";
import {facilitiesData} from "../../../../../Constant/OurFacilities/FacilitiesData.jsx";

export default function FacilityCard(props) {

  const renderCard = (facility) => {
    return (
      <article className="facilitycard light blue">
        <img
          className="facilitycard-img"
          src={facility?.image}
          alt="facilitycard-logo"
        />
        <div className="facilitycard-text t-dark">
          <h1 className="facilitycard-title blue">{facility?.title}</h1>
          <div className="facilitycard-bar" />
          <div className="facilitycard-preview-txt mt-3">
            {facility?.description}
          </div>
        </div>
      </article>
    );
  };

  return <div className="py-2 text-dark light">
    {
        facilitiesData?.map((FacilityCard)=> (
            renderCard(FacilityCard)
        ))
    }
  </div>;
}
