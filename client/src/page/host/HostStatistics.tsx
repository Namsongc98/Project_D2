import { Box, Container, Grid, Paper } from "@mui/material";
import {
  //Chart,
  CopyRight,
  TableHostRoomConfirm,
} from "../../component/componentPage";
//import Deposits from "../../component/componentPage/host/Deposit";
import { useEffect, useState } from "react";
import { getBookingPending, getBookingSuccess } from "../../service";

const HostStatistics = () => {
  const [bookingPending, setBookingPending] = useState();
  const [bookingSuccess, setBookingSuccess] = useState();

  const getAllBookingPending = async () => {
    try {
      const roomData = await getBookingPending();
      setBookingPending(roomData.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBookingSuccess = async () => {
    try {
      const roomData = await getBookingSuccess();
      setBookingSuccess(roomData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookingPending();
    getAllBookingSuccess();
  }, []);

  return (
    <Box component="section">
      <Container  sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableHostRoomConfirm
                data={bookingPending}
                getData={getAllBookingPending}
                getData2={getAllBookingSuccess}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TableHostRoomConfirm
                data={bookingSuccess}
                getData={getAllBookingSuccess}
              />
            </Paper>
          </Grid>
        </Grid>
        <CopyRight sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default HostStatistics;
