import { ThemeProvider } from "@emotion/react";
import { Box, Toolbar, createTheme } from "@mui/material";
import { useState } from "react";
import { AppBarComponent, DrawerComponent } from "../../component/dashboard";
import { pathAdmin } from "../../constain";
type Props = {
  children: React.ReactNode;
};
const LayoutAdmin = ({ children }: Props) => {
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
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LayoutAdmin;
