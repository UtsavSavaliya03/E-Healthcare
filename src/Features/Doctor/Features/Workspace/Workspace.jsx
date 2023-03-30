import React from 'react';
import { Helmet } from "react-helmet";

export default function Workspace() {
  return (
    <div>
      <Helmet>
        <title>Doctor | Workspace</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1>
        Doctor's Workspace
      </h1>
    </div>
  )
}