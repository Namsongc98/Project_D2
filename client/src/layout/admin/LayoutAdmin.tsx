import { ThemeProvider } from "@emotion/react";
import { Box, Toolbar, createTheme } from "@mui/material";
import { useState } from "react";
import { AppBarComponent, DrawerComponent } from "../../component/dashboard";
import { pathAdmin } from "../../constain";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  const defaultTheme = createTheme();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <AppBarComponent toggleDrawer={toggleDrawer} open={open} />
          <DrawerComponent
            toggleDrawer={toggleDrawer}
            open={open}
            paths={pathAdmin}
          />
          <Box
            component="main"
            sx={{
              backgroundColor: "#eeeeee",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LayoutAdmin;
