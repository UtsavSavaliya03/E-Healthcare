import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../Services/theme.js";
import { mockTransactions } from "../../../../Constant/Admin/mockData.js";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./Components/Header.jsx";
import LineChart from "./Components/LineChart.jsx";
import BarChart from "./Components/BarChart.jsx";
import StatBox from "./Components/StatBox.jsx";
import ProgressCircle from "./Components/ProgressCircle.jsx";
import "./Dashboard.css";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette);
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
              borderRadius="5px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                  <EmailIcon
                    sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>
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
                title="431,225"
                subtitle="Total Patients"
                progress="0.50"
                increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
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
                title="32,441"
                subtitle="Total Hospitals"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
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
                title="25,134"
                subtitle="Total Doctors"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </div>

          <div className="col-lg-8 col-md-8 col-sm-12">
            <Box
              className="py-2 my-lg-4 admin-dashboard-box"
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
          <div className="col-lg-4 col-md-4 col-sm-12">
            <Box
              maxHeight="395px"
              borderRadius="5px"
              className="my-lg-4 admin-dashboard-box"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="4px solid white"
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Orders
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
                  <Box
                    backgroundColor={colors.blueAccent[500]}
                    color="white"
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12">
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
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="120" />
                <Typography
                  variant="h5"
                  color={colors.blueAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography color={colors.grey[500]}>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 mb-lg-4">
            <Box
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              className="admin-dashboard-box"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </Typography>
              <Box height="265px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </>
  );
}
