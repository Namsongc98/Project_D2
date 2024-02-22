import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const CalendarAdmin = () => {
  return (
    <Box component="section">
      <Container sx={{ my: 4, mx: 1 }} maxWidth={"xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography color="#1976d2" fontSize="24px" fontWeight="700">
                Thống kê lịch đặt
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalendarAdmin;
