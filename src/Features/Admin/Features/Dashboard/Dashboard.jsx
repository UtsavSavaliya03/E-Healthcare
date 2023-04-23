import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../Services/theme.js";
import { FaMicroscope, FaUserAlt, FaStethoscope, FaHospitalAlt } from 'react-icons/fa';
import Header from "./Components/Header.jsx";
import LineChart from "./Components/LineChart.jsx";
import BarChart from "./Components/BarChart.jsx";
import StatBox from "./Components/StatBox.jsx";
import "./Dashboard.css";
import { Helmet } from "react-helmet";
import { fetchAdminDashboardData } from '../../Services/dashboardServices.jsx'
import Avatar from 'react-avatar';
import moment from 'moment';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import PieChart from "./Components/PieChart.jsx";


export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const token = localStorage.getItem("token") || null;
  const [totalHospitals, setTotalHospitals] = useState([])
  const [totalDoctors, setTotalDoctors] = useState([])
  const [totalLaboratories, setTotalLaboratories] = useState([])
  const [totalPatients, setTotalPatients] = useState([])
  const [activePatients, setActivePatients] = useState([])
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const fetchAdminDashboardDataHandler = async () => {
    setIsLoading(true)
    const headers = {
      "Authorization": token
    }
    const adminData = await fetchAdminDashboardData(headers)
    if (adminData?.status) {
      setTotalDoctors(adminData?.data?.totalDoctors)
      setTotalHospitals(adminData?.data?.totalHospitals)
      setTotalLaboratories(adminData?.data?.totalLaboratories)
      setTotalPatients(adminData?.data?.totalPatients)
      setActivePatients(adminData?.data?.activePatients)
      setLineData([{ id: "Patients", color: tokens().blueAccent[500], data: adminData?.data?.patientsData }, { id: "Doctors", color: tokens().greenAccent[500], data: adminData?.data?.doctorsData }])
      setBarData(adminData?.data?.hospitalsAndLaboratoriesData)
      
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminDashboardDataHandler()
  }, [])

  return (
    <>
      <Helmet>
        <title>Dashboard | Health Horizon</title>
      </Helmet>
      <Box
        p="20px"
        sx={{ backgroundColor: "white", width: "100%" }}
        className=""
      >
        <Box className="mx-3">
          <Header title="DASHBOARD" subtitle="Welcome to admin dashboard" />
        </Box>

        <Box className="admin-dashboard-container row m-0">
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Box
              className="py-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
              display="flex"
              borderRadius="5px"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={totalPatients}
                subtitle="Total Patients"
                progress="0.50"
                increase="+21%"
                icon={
                  <FaUserAlt
                    style={{ color: colors.blueAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Box
              className="py-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={totalLaboratories}
                subtitle="Total Laboratories"
                progress="0.75"
                increase="+14%"

                icon={
                  <FaMicroscope
                    style={{ color: colors.blueAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Box
              className="py-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={totalHospitals}
                subtitle="Total Hospitals"
                progress="0.30"
                increase="+5%"
                icon={
                  <FaHospitalAlt
                    style={{ color: colors.blueAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Box
              className="py-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={totalDoctors}
                subtitle="Total Doctors"
                progress="0.80"
                increase="+43%"
                icon={
                  <FaStethoscope
                    style={{ color: colors.blueAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>

          <div className="col-lg-8 col-md-8 col-sm-12" >
            <Box
              className="py-2 my-lg-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              height={"393px"}
            >
              <Box
                p="30px"
                display="flex"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                    marginRight="50px"
                  >
                    Total Patients
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.blueAccent[500]}
                  >
                    {totalPatients}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Total Doctors
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.blueAccent[500]}
                  >
                    {totalDoctors}
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 20px 0 0">
                {
                  isLoading ? (
                    <div className="w-100 d-flex justify-content-center pt-5 mt-3">
                      <Spinner />
                    </div>
                  ) : (<LineChart lineData={lineData} />
                  )}
              </Box>
            </Box>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <Box
              borderRadius="5px"
              className="my-lg-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="4px solid white"
                backgroundColor={colors.blueAccent[500]}
                colors={colors.grey[100]}
                p="15px"
                borderRadius={"5px"}
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  className="text-white"
                  fontWeight="600"

                >
                  Active Patients
                </Typography>
              </Box>
              <Box height={"327px"} overflow="auto">
                {
                  isLoading ? (
                    <div className="w-100 d-flex justify-content-center pt-5 mt-5">
                      <Spinner />
                    </div>
                  ) :
                    activePatients.map((patient, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="4px solid white"
                        p="15px"
                      >
                        <Box>
                          <Avatar className='doctor-profile-avatar' size='50' round name={`${patient?.fName} ${patient?.lName}`} src={patient?.profileImg} />
                        </Box>
                        <Box>
                          <Typography
                            color={colors.blueAccent[500]}
                            variant="h5"
                            fontWeight="600"
                          >
                            {patient?.patientId}
                          </Typography>
                          <Typography color={colors.grey[100]}>
                            {`${patient?.fName} ${patient?.lName}`}
                          </Typography>
                        </Box>
                        <Box color={colors.grey[100]}>Since {moment(patient?.createdAt?.date).format("MMM, YYYY")}</Box>
                      </Box>
                    ))}
              </Box>
            </Box>
          </div>

          <div className="col-md-5 col-sm-12">
            <Box
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              p="30px"
              className="admin-dashboard-box"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Users
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
                height={'300px'}
              >
                {
                  isLoading ? (
                    <div className="w-100 d-flex justify-content-center pt-5 mt-3">
                      <Spinner />
                    </div>
                  ) : (<PieChart usersData={[totalHospitals, totalLaboratories, totalDoctors, totalPatients]} />
                  )}
              </Box>
            </Box>
          </div>
          <div className="col-md-7 col-sm-12 mb-lg-4">
            <Box
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              className="admin-dashboard-box"
              height={"415px"}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Total Hospitals And Laboratories
              </Typography>
              <Box height="365px">
                {
                  isLoading ? (
                    <div className="w-100 d-flex justify-content-center pt-5 mt-3">
                      <Spinner />
                    </div>
                  ) : (<BarChart barData={barData} />
                  )}
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </>
  );
}
