import {
  AlertColor,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { CalendarHostParam } from "../host";
import { useEffect, useState } from "react";
import { getBookingCarendar } from "../../service";
import { SnackBarReuse } from "../../component/componentReuse";

const CalendarAdmin = () => {
  const [arrBooking, setArrBooking] = useState([]);
  const [type, setType] = useState<AlertColor | undefined>();
  const [mess, setMess] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await getBookingCarendar(state.id);
        setArrBooking(res);
      } catch (error) {
        setType("error");
        setMess("error sever");
      }
    })();
  }, [state.id]);

  return (
    <Box component="section">
      <Container sx={{ my: 4, mx: 1 }} maxWidth={"xl"}>
        <SnackBarReuse type={type} message={mess} setError={setMess} />
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
