import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

import { useState } from "react";
import { AppBarComponent, DrawerComponent } from "../../component/dashboard";
import { pathHost } from "../../constain";

const LayoutHost = () => {
  const defaultTheme = createTheme();

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          {/* header */}
          <AppBarComponent toggleDrawer={toggleDrawer} open={open} />
          {/* aside */}
          <DrawerComponent
            toggleDrawer={toggleDrawer}
            open={open}
            paths={pathHost}
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

export default LayoutHost;
