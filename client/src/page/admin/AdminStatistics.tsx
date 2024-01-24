import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import Deposits from "../../component/componentPage/host/Deposit";
import { useEffect, useState } from "react";
import { getAllHost, getAllUser } from "../../service";

const AdminStatistics = () => {
  const [countHost, setCountHost] = useState();
  const [countUser, setCountUser] = useState();

  const getCountUser = async () => {
    try {
      const res = await getAllUser();
      setCountUser(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getCountHost = async () => {
    try {
      const res = await getAllHost();
      setCountHost(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountUser();
    getCountHost();
  }, []);
  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                height: 60,
              }}
            >
              <Typography color="#1976d2" fontSize="24px" fontWeight="700">
                Quản lý người đặt phòng
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              <Deposits label="Số lượng host" count={countHost} />
            </Paper>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              <Deposits label="Số lượng user" count={countUser} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
            ></Paper>
          </Grid>
        </Grid>
        <CopyRight sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default AdminStatistics;
