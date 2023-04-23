import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { tokens } from "../../../../Services/theme.js";
import Header from "./Components//Header";
import LineChart from "./Components/LineChart.jsx";
import "./Dashboard.css";
import DoctorDashboardVector from "../../../../Assets/Icons/Doctor-dashboard-vector.png";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../Store/globalState.jsx';
import { Helmet } from "react-helmet";
import Avatar from 'react-avatar';
import moment from 'moment';
import { fetchAppointmentsByStatus, updateAppointmentById, fetchDoctorPatientsData } from '../../Services/appointmentServices.jsx';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const user = useRecoilValue(userState);
  const [appointments, setAppointmentss] = useState([])
  const [approvedAppointments, setApprovedAppointments] = useState([])
  const token = localStorage.getItem("token") || null;
  const [patientsData, setPatientsData] = useState([]);
  const [totalConsultedPatients, setTotalConsultedPatients] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointmentsHandler = async (status) => {
    const headers = {
      'Authorization': token
    }
    const params = {
      status: status,
      doctor: user?._id
    }
    const appointmentData = await fetchAppointmentsByStatus(params, headers)
    setAppointmentss(appointmentData?.data)

  }

  const fetchApprovedAppointmentsHandler = async (status) => {
    const headers = {
      'Authorization': token
    }
    const params = {
      status: status,
      doctor: user?._id
    }
    const appointmentData = await fetchAppointmentsByStatus(params, headers)
    setApprovedAppointments(appointmentData?.data)

  }
  const acceptAppointment = async (id, status) => {
    const param = {
      status: status,
      type: "Doctor"
    }
    const headers = {
      'Authorization': token
    }

    await updateAppointmentById(id, param, headers)
    let currentObject;
    const updatedTestAppointments = appointments.filter((appointment) => {
      if (appointment._id == id) {
        currentObject = appointment;
      }
      return appointment._id !== id
    })
    setAppointmentss(updatedTestAppointments);
    setApprovedAppointments(current => [...current, currentObject])

  }
  const rejectAppointment = async (id, status) => {
    const param = {
      status: status,
      type: "Doctor"
    }
    const headers = {
      'Authorization': token
    }

    await updateAppointmentById(id, param, headers)

    const updatedTestAppointments = appointments.filter((appointment) => {
      return appointment._id !== id
    })
    setAppointmentss(updatedTestAppointments);
  }

  const fetchDoctorPatientsDataHandler = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token,
    };
    const patientsDataResponse = await fetchDoctorPatientsData(user?._id, headers);
    if (patientsDataResponse?.status) {
      setPatientsData([{ id: "Patients", color: tokens().blueAccent[500], data: patientsDataResponse?.data?.totalConsultedPatientData }, { id: "Appointments", color: tokens().greenAccent[500], data: patientsDataResponse?.data?.totalAppointmentsData }]);
      setTotalAppointments(patientsDataResponse?.data?.totalAppointments);
      setTotalConsultedPatients(patientsDataResponse?.data?.totalConsultedPatient);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    /* --- Status - 0 for pending --- */
    fetchAppointmentsHandler(0)
    /* --- Status - 1 for approved --- */
    fetchApprovedAppointmentsHandler(1)

    fetchDoctorPatientsDataHandler();
  }, [])

  return (
    <Box p="20px" sx={{ backgroundColor: "white", width: "100%" }} className="doctor-dashboard-container">
      <Helmet>
        <title>Dashboard | Doctor</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <Box className="ml-3">
        <Header title="DASHBOARD" subtitle="Welcome to Doctor Dashboard" />
      </Box>

      <Box className="doctor-dashboard-container row m-0">
        <div className="col-md-9 col-lg-9 col-sm-9 row m-0 p-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Box
              className="py-4 doctor-dashboard-box"
              backgroundColor={colors.blueAccent[500]}
              borderRadius="5px"
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box className="mx-4 my-1 text-light">
                <Typography variant="h4" fontWeight="600" color="white">
                  Welcome {user?.fName}!
                </Typography>
                <Typography variant="h6" className="mt-2">
                  Here are your important tasks and reports.
                </Typography>
                <Typography variant="h6">
                  Please check your appointment requests.
                </Typography>
              </Box>
              <Box>
                <img
                  src={DoctorDashboardVector}
                  alt="DoctorDashboardVector"
                  className="doctor-dashboard-vector"
                />
              </Box>
            </Box>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <Box
              className="py-2 my-lg-4 doctor-dashboard-box"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
            >
              <Box
                p="30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Total Appointments
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.blueAccent[500]}
                  >
                    {totalAppointments}
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 20px 0 0">
                {
                  isLoading ? (
                    <div className="w-100 d-flex justify-content-center pt-5">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      {
                        patientsData?.length > 0 ? (
                          <LineChart reportsData={patientsData} />
                        ) : (
                          <div className="w-100 text-center text-muted pt-5">
                            <h5>No data available for specific doctor.</h5>
                          </div>
                        )
                      }
                    </>
                  )
                }
              </Box>
            </Box>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 m-0 ">
          <Box
            className="py-2 py-lg-3 doctor-dashboard-box doctor-dashboard-sidebox d-flex justify-content-center flex-column"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
          >
            <Avatar
              alt="Remy Sharp"
              round
              name={`${user?.fName} ${user?.lName}`}
              src={user?.profileImg}
              sx={{ width: 120, height: 120 }}
              className="align-self-center my-4"
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color={colors.blueAccent[500]}
              className="align-self-center break-line-1 pt-4 pb-2"
            >
              Dr. {user?.fName} {user?.lName}
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[500]}
              className="align-self-center break-line-1 mt-1"
            >
              {user?.email}
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[500]}
              className="align-self-center text-center break-line-1"
            >
              {user?.hospital?.name}
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[500]}
              className="mb-3 mb-lg-4 mb-sm-2 align-self-center text-center break-line-1"
            >
              {user?.department?.name}
            </Typography>
            <Divider variant="middle" />

            <Divider variant="middle" className="mb-2" />
            <Box className="p-lg-3 row m-0 g-0"
            >
              <Box className="col-md-12 mb-lg-3 mt-sm-1 doctor-dashboard-statistics-container" >
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={colors.grey[500]}
                  className='break-line-1'
                >
                  Total Appointments
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.blueAccent[500]}
                >
                  {totalAppointments}
                </Typography>
              </Box>
              <Box className="col-md-12 mb-lg-3 mt-sm-1 doctor-dashboard-statistics-container">
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={colors.grey[500]}
                  className='break-line-1'
                >
                  Total Consulted Patients
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.blueAccent[500]}
                >
                  {totalConsultedPatients}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 row p-0 m-0">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <Box
              maxHeight="390px"
              borderRadius="5px"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="4px solid white"
                backgroundColor={colors.blueAccent[500]}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  className="text-white"
                  variant="h5"
                  fontWeight="600"
                >
                  Appointment Requests
                </Typography>
              </Box>
              {appointments?.length === 0 ?
                <Box
                  color={colors.grey[100]} display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ textAlign: "center", minHeight: "85px" }}
                  className='py-5'
                >
                  <Typography
                    className="text-secondary py-5"
                    variant="h5"
                    fontWeight="600"
                  >
                    No pending Appointments
                  </Typography>
                </Box>
                :
                <Box overflow={"auto"} maxHeight="255px">
                  {appointments?.map((appointment, index) => (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom="4px solid white"
                      p="15px"
                    >
                      <Box>
                        <Avatar className='doctor-profile-avatar' size='50' round name={`${appointment?.patient?.fName} ${appointment?.patient?.lName}`} src={appointment?.patient?.profileImg} />
                      </Box>
                      <Box>
                        <Typography
                          color={colors.blueAccent[500]}
                          variant="h5"
                          fontWeight="600"
                        >
                          {appointment?.patient?.patientId}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                          {`${appointment?.patient?.fName} ${appointment?.patient?.lName}`}                    </Typography>
                      </Box>
                      <Box color={colors.grey[100]}>{moment(appointment.appointmentDate).format("LL")}</Box>
                      <Box color={colors.grey[100]}>{appointment.appointmentTime}</Box>
                      <Box color={colors.blueAccent[500]}>
                        <IconButton
                          aria-label="Accept appointment"
                          sx={{ color: colors.blueAccent[500] }}
                          onClick={() => acceptAppointment(appointment?._id, 1)}
                        >
                          <CheckIcon sx={{ fontSize: "28px" }} />
                        </IconButton>
                        <IconButton
                          aria-label="Reject appointment"
                          sx={{ color: "red" }}
                          onClick={() => rejectAppointment(appointment?._id, 3)}
                        >
                          <ClearIcon sx={{ fontSize: "28px" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              }
            </Box>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <Box
              maxHeight="390px"
              borderRadius="5px"
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
              >
                <Typography
                  className="text-white"
                  variant="h5"
                  fontWeight="600"
                >
                  Approved Appointments
                </Typography>
              </Box>
              {approvedAppointments?.length === 0 ?
                <Box color={colors.grey[100]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ textAlign: "center", minHeight: "85px" }}
                  className='py-5'
                >
                  <Typography
                    className="text-secondary py-5"
                    variant="h5"
                    fontWeight="600"
                  >
                    No approved Appointments
                  </Typography>
                </Box> : <Box overflow={"auto"} maxHeight="255px"> {approvedAppointments.map((approvedAppointment, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="4px solid white"
                    p="15px"

                  >
                    <Box>
                      <Avatar className='doctor-profile-avatar' size='50' round name={`${approvedAppointment?.patient?.fName} ${approvedAppointment?.patient?.lName}`} src={approvedAppointment?.patient?.profileImg} />
                    </Box>
                    <Box>
                      <Typography
                        color={colors.blueAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {approvedAppointment?.patient?.patientId}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {`${approvedAppointment?.patient?.fName} ${approvedAppointment?.patient?.lName}`}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{moment(approvedAppointment.appointmentDate).format("LL")}</Box>
                    <Box color={colors.grey[100]}>{approvedAppointment.appointmentTime}</Box>
                  </Box>
                ))}
                </Box>
              }
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
