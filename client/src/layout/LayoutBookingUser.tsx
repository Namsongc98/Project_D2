import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { TabsCpm } from "../component/componentReuse";
import { tapUserBookingAdmin } from "../constain";
import { Outlet } from "react-router-dom";
import { CopyRight } from "../component/componentPage";

const LayoutBookingUser = () => {
  return (
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
              <Typography
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
                align="center"
              >
                Thống kê đơn đặt hàng của người dùng
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
              <TabsCpm taps={tapUserBookingAdmin} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
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
  );
};

export default LayoutBookingUser;
