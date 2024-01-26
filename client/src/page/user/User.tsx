import { Box, Paper } from "@mui/material";
import { TapsCpm } from "../../component/componentReuse";
import { tapUserBooking } from "../../constain";
import { Outlet } from "react-router-dom";
const User = () => {
  return (
    <>
      <Box sx={{ width: "100%", mb: 4,  }}>
        <Paper>
          <TapsCpm taps={tapUserBooking}/>
        </Paper>
      </Box>
      <Outlet />
    </>
  );
};

export default User;
