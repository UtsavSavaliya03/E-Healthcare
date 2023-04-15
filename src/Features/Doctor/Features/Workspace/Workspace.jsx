import React from 'react';
import './Workspace.css';
import { Helmet } from "react-helmet";
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import PatientsList from './Components/PatientsList.jsx';
import PrescriptionList from './Components/PrescriptionsList.jsx';

export default function Workspace() {

  const [tabValue, setTabValue] = React.useState('patients');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className='workspace-container'>
      <Helmet>
        <title>Doctor | Workspace</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className='workspace-card'>
        <TabContext value={tabValue}>
          <TabList onChange={handleTabChange} className='p-4'>
            <Tab label="patients" value="patients" />
            <Tab label="today's appointments" value="appointment" />
            <Tab label="prescriptions" value="prescriptions" />
          </TabList>
          <TabPanel value="patients" className='px-0'>
            <PatientsList handleTabChange={handleTabChange} />
          </TabPanel>
          <TabPanel value="appointment" className='px-0'>
            <PatientsList handleTabChange={handleTabChange} />
          </TabPanel>
          <TabPanel value="prescriptions" className='px-0'>
            <PrescriptionList />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  )
}