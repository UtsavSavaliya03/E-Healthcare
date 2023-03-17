import React from 'react';
import { Helmet } from "react-helmet";
import DepartmentCard from "../Department/Components/DepartmentCard.jsx";

export default function DepartmentList() {
  return (
    <>
      <Helmet>
        <title>Department | Health Horizon</title>
      </Helmet>
      <div><DepartmentCard/></div>
    </>
  )
}