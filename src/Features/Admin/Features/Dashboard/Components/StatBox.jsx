import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../../Services/theme.js";
import '../Dashboard.css';
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex">
          <Box className='mr-3'>{icon}</Box>
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            className="break-line-1"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="15px">
        <Typography className="break-line-1" fontWeight="bold" variant="h5" sx={{ color: colors.blueAccent[500] }}>
          {subtitle}
        </Typography>
        {/* <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[500],fontWeight: "bold" }}
        >
          {increase}
        </Typography> */}
      </Box>
    </Box>
  );
};

export default StatBox;
