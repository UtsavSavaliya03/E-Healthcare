import React from "react";
import "./FacilityCardContainer.css";
import FacilityCard from "./FacilityCard";

export default function Facilities() {
  return (
    <div className="facilities-card-container pb-3 light pt-2">
      <div className="h1 text-center text-dark pb-lg-4" id="pageHeaderTitle">
        FACILITIES FOR YOU
      </div>
        <div className="container">
          <FacilityCard />
        </div>
    </div>
  );
}
