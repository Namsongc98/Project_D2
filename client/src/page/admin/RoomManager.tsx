import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import { Outlet } from "react-router-dom";
import { TabsCpm } from "../../component/componentReuse";
import { tapAdminRoom } from "../../constain";

const RoomManager = () => {
  return (
    <>
      <Box component="section">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  mb: 5,
                }}
              >
                <Typography color="#1976d2" fontSize="24px" fontWeight="700">
                  Thống kê phòng 
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TabsCpm taps={tapAdminRoom} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Outlet />
              </Paper>
            </Grid>
          </Grid>
          <CopyRight sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
};

export default RoomManager;