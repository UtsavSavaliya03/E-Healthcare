import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { tokens } from "../../../../Services/theme.js";
import Header from "./Components//Header";
import LineChart from "./Components/LineChart.jsx";
import "./Dashboard.css";
import LaboratoryDashboardVector from "../../../../Assets/Icons/Laboratory-dashboard-vector.png";
import { fetchLaboratoryReportData } from '../../Services/laboratoryServices.jsx';
import { Spinner } from '../../../../Components/Common/Spinners/Spinners.jsx';
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../Store/globalState.jsx';
import { Helmet } from "react-helmet";
import LaboratoryLogo from '../../../../Assets/Icons/Laboratory-logo.png'
import { fetchTestRequestsByStatus, updateTestRequestsById } from '../../Services/laboratoryServices.jsx';
import Avatar from 'react-avatar';
import moment from 'moment';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const user = useRecoilValue(userState);
  const [testRequests, setTestRequests] = useState([])
  const [approvedRequests, setApprovedRequests] = useState([])
  const token = localStorage.getItem("token") || null;
  const [isLoading, setIsLoading] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [totalReports, setTotalReports] = useState(0);

  const fetchLaboratoryReportDataHandler = async () => {
    setIsLoading(true);
    const headers = {
      'Authorization': token,
    };
    const reportsDataResponse = await fetchLaboratoryReportData(user?._id, headers);
    ;
    if (reportsDataResponse?.data?.reportsData?.length > 0) {
      setReportsData([{ id: "Reports", color: tokens().blueAccent[500], data: reportsDataResponse?.data?.reportsData }]);
      setTotalReports(reportsDataResponse?.data?.totalRecords);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchLaboratoryReportDataHandler();
  }, [])

  const fetchTestRequestHandler = async (status) => {
    const headers = {
      'Authorization': token
    }

    const params = {
      laboratory: user?._id,
      status: status
    }

    const testRequests = await fetchTestRequestsByStatus(params, headers)
    setTestRequests(testRequests?.data)
  }

  const fetchApprovedTestRequestHandler = async (status) => {
    const headers = {
      'Authorization': token
    }

    const params = {
      laboratory: user?._id,
      status: status
    }

    const testRequests = await fetchTestRequestsByStatus(params, headers)
    setApprovedRequests(testRequests?.data)
  }

  const acceptTestRequest = async (id, status) => {
    const param = {
      'status': status
    }
    const headers = {
      'Authorization': token
    }

    await updateTestRequestsById(id, param, headers)
    let currentObject;
    const updatedTestRequests = testRequests.filter((request) => {
      if (request._id == id) {
        currentObject = request;
      }
      return request._id !== id
    })
    setTestRequests(updatedTestRequests);
    setApprovedRequests(current => [...current, currentObject])

  }
  const rejectTestRequest = async (id, status) => {
    const param = {
      'status': status
    }
    const headers = {
      'Authorization': token
    }

    await updateTestRequestsById(id, param, headers)

    const updatedTestRequests = testRequests.filter((request) => {
      return request._id !== id
    })
    setTestRequests(updatedTestRequests);
  }
  useEffect(() => {
    /* --- Status - 0 for pending --- */
    fetchTestRequestHandler(0)
    /* --- Status - 1 for approved --- */
    fetchApprovedTestRequestHandler(1)
  }, [])


  return (
    <Box p="20px" sx={{ backgroundColor: "white", width: "100%" }} className="doctor-dashboard-container">
      <Helmet>
        <title>Dashboard | Laboratory</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <Box className="ml-3">
        <Header title="DASHBOARD" subtitle="Welcome to Laboratory Dashboard" />
      </Box>

      <Box className="doctor-dashboard-container row m-0">
        <div className="col-12">
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
                Welcome, {user?.name}!
              </Typography>
              <Typography variant="h6" className="mt-2">
                Here are your important tasks and reports.
              </Typography>
              <Typography variant="h6">
                Please check your test requests.
              </Typography>
            </Box>
            <Box>
              <img
                src={LaboratoryDashboardVector}
                alt="LaboratoryDashboardVector"
                className="laboratory-dashboard-vector"
              />
            </Box>
          </Box>
        </div>
        <div className="col-md-9 col-lg-9 col-sm-9 row m-0 p-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Box
              className="py-2 my-lg-4 laboratory-dashboard-box"
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
                    Total Test Reports
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.blueAccent[500]}
                  >
                    {totalReports}
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
                        reportsData?.length > 0 ? (
                          <LineChart reportsData={reportsData} />
                        ) : (
                          <div className="w-100 text-center text-muted pt-5">
                            <h5>No data available for specific laboratory.</h5>
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
        <div className="col-lg-3 col-md-3 col-sm-3 m-0 my-lg-4">
          <Box
            className="pb-2 pt-2 doctor-dashboard-box d-flex justify-content-center flex-column"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
          >
            <Avatar
              alt="Remy Sharp"
              round
              src={LaboratoryLogo}
              sx={{ width: 120, height: 120 }}
              className="mb-4 mt-2 align-self-center"
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.blueAccent[500]}
              className="align-self-center break-line-1 px-3"
            >
              {user?.name}
            </Typography>
            <Typography
              variant="h6"
              color={colors.grey[500]}
              className="px-3 align-self-center break-line-1 mt-2"
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
            <Box className="px-lg-3 py-lg-2 row m-0 g-0">
              <Box className="col-12 mt-sm-1 doctor-dashboard-statistics-container">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={colors.blueAccent[500]}
                >
                  {user?.city?.name}
                </Typography>
                <Typography
                  variant="h7"
                  fontWeight="600"
                  color={colors.grey[500]}
                  className='break-line-1'
                >
                  City
                </Typography>
              </Box>
              <Box className="col-12 mt-lg-3 mt-sm-1 doctor-dashboard-statistics-container">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={colors.blueAccent[500]}
                >
                  {user?.state?.name}
                </Typography>
                <Typography
                  variant="h7"
                  fontWeight="600"
                  color={colors.grey[500]}
                  className='break-line-1'
                >
                  State
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
                  Test Requests
                </Typography>
              </Box>
              {testRequests?.length === 0 ?
                <Box
                  color={colors.grey[100]} display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ textAlign: "center", minHeight: "85px" }}
                  className='py-5'
                >
                  <Typography
                    className="text-secondary py-4"
                    variant="h5"
                    fontWeight="600"
                  >
                    No pending test request
                  </Typography>
                </Box>
                : <Box overflow={"auto"} maxHeight="255px"> {testRequests?.map((request, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="4px solid white"
                    p="15px"
                  >
                    <Box>
                      <Avatar className='doctor-profile-avatar' size='50' round name={`${request?.patient?.fName} ${request?.patient?.lName}`} src={request?.patient?.profileImg} />

                    </Box>
                    <Box>
                      <Typography
                        color={colors.blueAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {request?.patient?.patientId}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {`${request?.patient?.fName} ${request?.patient?.lName}`}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{request?.type}</Box>
                    <Box color={colors.grey[100]}>{moment(request?.createdAt).format('LLL')}</Box>
                    <Box color={colors.blueAccent[500]}>
                      <IconButton
                        aria-label="Accept appointment"
                        sx={{ color: colors.blueAccent[500] }}
                        onClick={() => acceptTestRequest(request?._id, 1)}
                      >
                        <CheckIcon sx={{ fontSize: "28px" }} />
                      </IconButton>
                      <IconButton
                        aria-label="Reject appointment"
                        sx={{ color: "red" }}
                        onClick={() => rejectTestRequest(request?._id, 3)}
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
                  Approved Test Requests
                </Typography>
              </Box>
              {approvedRequests?.length === 0 ?
                <Box color={colors.grey[100]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ textAlign: "center", minHeight: "85px" }}
                  className='py-5'
                >
                  <Typography
                    className="text-secondary py-4"
                    variant="h5"
                    fontWeight="600"
                  >
                    No approved test request
                  </Typography>
                </Box> : <Box overflow={"auto"} maxHeight="255px"> {approvedRequests?.map((request, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="4px solid white"
                    p="15px"
                  >
                    <Box>
                      <Avatar className='doctor-profile-avatar' size='50' round name={`${request?.patient?.fName} ${request?.patient?.lName}`} src={request?.patient?.profileImg} />
                    </Box>
                    <Box >
                      <Typography
                        color={colors.blueAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {request?.patient?.patientId}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {`${request?.patient?.fName} ${request?.patient?.lName}`}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{request?.type}</Box>
                    <Box color={colors.grey[100]}>{moment(request?.updatedAt).format('LLL')}</Box>
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
