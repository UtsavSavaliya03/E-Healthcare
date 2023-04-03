import { Box, Typography, useTheme, Avatar, Divider } from "@mui/material";
import { tokens } from "../../../../Services/theme.js";
import { mockTransactions } from "../../../../Constant/Admin/mockData.js";
import Header from "./Components//Header";
import LineChart from "./Components/LineChart.jsx";
import "./Dashboard.css";
import DoctorDashboardVector from "../../../../Assets/Icons/Doctor-dashboard-vector.png";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../Store/globalState.jsx';
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const user = useRecoilValue(userState);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: colors.grey[800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: colors.blueAccent[500],
    },
  }));

  return (
    <Box p="20px" sx={{ backgroundColor: "white", width: "100%" }} className="doctor-dashboard-container">
      <Helmet>
        <title>Doctor | Dashboard</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <Box className="ml-3">
        <Header title="DASHBOARD" subtitle="Welcome to doctor dashboard" />
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
                  Please check your appointments.
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
                    Total Users
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.blueAccent[500]}
                  >
                    5,93,423
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 20px 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 m-0">
          <Box
            className="py-2 py-lg-3 doctor-dashboard-box d-flex justify-content-center flex-column"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
          >
            <Avatar
              alt="Remy Sharp"
              src={user?.profileImg}
              sx={{ width: 120, height: 120 }}
              className="my-4 align-self-center"
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.blueAccent[500]}
              className="align-self-center break-line-1"
            >
              Dr. {user?.fName} {user?.lName}
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
            <Box className="p-lg-4 p-sm-3 doctor-dashboard-progress-container text-left">
              <Typography
                variant="h5"
                fontWeight="bold"
                className="doctor-profile-appointment-title break-line-1"
                color={colors.blueAccent[500]}
              >
                10 Appointments per day
              </Typography>
              <Typography
                variant="h6"
                className="mt-2"
                color={colors.grey[500]}
              >
                Appointment limit
              </Typography>
              <BorderLinearProgress
                className="mt-1 mb-lg-2"
                variant="determinate"
                value={50}
              />
            </Box>
            <Divider variant="middle" className="mb-2" />
            <Box className="p-lg-3 row m-0 g-0">
              <Box className="col-lg-6 col-sm-12 mb-lg-3 mt-sm-1 doctor-dashboard-statistics-container">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.blueAccent[500]}
                >
                  5,93,423
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={colors.grey[500]}
                  className='break-line-1'
                >
                  Appointments
                </Typography>
              </Box>
              <Box className="col-lg-6 col-sm-12 mb-lg-3 mt-sm-1 doctor-dashboard-statistics-container">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.blueAccent[500]}
                >
                  4,83,423
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={colors.grey[500]}
                  className='break-line-1'
                >
                  Patients
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
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="4px solid white"
                  p="15px"
                >
                  <Box>
                    <Avatar
                      alt={transaction?.user}
                      src={transaction?.avatar}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      color={colors.blueAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box color={colors.blueAccent[500]}>
                    <IconButton
                      aria-label="Accept appointment"
                      sx={{ color: colors.blueAccent[500] }}
                    >
                      <CheckIcon sx={{ fontSize: "28px" }} />
                    </IconButton>
                    <IconButton
                      aria-label="Reject appointment"
                      sx={{ color: "red" }}
                    >
                      <ClearIcon sx={{ fontSize: "28px" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <Box
              maxHeight="390px"
              borderRadius="5px"
              backgroundColor={colors.primary[400]}
              overflow="auto"
              className=""
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
                  Appointments
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="4px solid white"
                  p="15px"
                >
                  <Box>
                    <Avatar
                      alt={transaction?.user}
                      src={transaction?.avatar}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      color={colors.blueAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                </Box>
              ))}
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
