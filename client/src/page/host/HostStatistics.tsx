import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import { TabsCpm } from "../../component/componentReuse";
import { tapsHostRoom } from "../../constain";
import { Outlet } from "react-router-dom";

const HostStatistics = () => {


  return (
    <Box component="section">
      <Container sx={{ mt: 4, mb: 4 }}>
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
                Quản lý phòng khách sạn
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <TabsCpm taps={tapsHostRoom} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
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
  );
};

export default HostStatistics;
