import { Box, Paper } from "@mui/material";
import { TapsCpm } from "../../component/componentReuse";
import { Outlet } from "react-router-dom";
const User = () => {
  return (
    <>
      <Box sx={{ width: "100%", mb: 4 }}>
        <Paper>
          <TapsCpm />
        </Paper>
      </Box>
      <Outlet />
    </>
  );
};

export default User;
