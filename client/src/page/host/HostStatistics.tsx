import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import {
  //Chart,
  CopyRight,
  TableHostRoomConfirm,
  Title,
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
              <Typography
                sx={{}}
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
              >
                Quản lý phòng khách sạn
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Khách đặt phòng chờ duyệt</Title>
              <TableHostRoomConfirm
                data={bookingPending!}
                getData={getAllBookingPending}
                getData2={getAllBookingSuccess}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Khách đặt phòng đã duyệt</Title>
              <TableHostRoomConfirm
                data={bookingSuccess!}
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
