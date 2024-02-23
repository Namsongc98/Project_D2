import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CalendarHostParam } from "../host";
import { useEffect, useState } from "react";
import { getBookingCarendar } from "../../service";

const CalendarAdmin = () => {
  const [arrBooking, setArrBooking] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await getBookingCarendar(state.id);
        console.log(res)
        setArrBooking(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.id]);

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
              <CalendarHostParam data={arrBooking} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalendarAdmin;
