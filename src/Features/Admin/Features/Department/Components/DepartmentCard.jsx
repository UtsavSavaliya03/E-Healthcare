import React from "react";
import "./DepartmentCard.css";
import Avatar from '@mui/material/Avatar';
import DepartmentCardSVG from "../../../../../Assets/Icons/Facility-card-heart.png";

export default function DepartmentCard() {
  return (
    <div>
      <div className="department-card">
        <div className="department-card-banner">
          <Avatar
            alt="Department Card SVG" 
            className="department-card-svg"
            src={DepartmentCardSVG}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <h2 className="department-card-name pt-4 mt-5 text-center font-weight-bold">
          Neurology
        </h2>
        <div className="department-card-title text-center">
          <p className="active-status-tag">Active</p>
        </div>
        <div className="desc mt-4">
          Morgan has collected ants since they were six years old and now has
          many dozen ants but none in their pants.
        </div>
      </div>
    </div>
  );
}
