import { AlertColor, Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import { useEffect, useState } from "react";
import { getBookingService } from "../../service";
import { columnBooking } from "../../constain";
import { SnackBarReuse, TableBooking } from "../../component/componentReuse";

const Bookingmanager = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = async () => {
    try {
      const res = await getBookingService();
      setData(res.data);
    } catch (error) {
      setType("error");
      setMessage("error sever");
    }
  };
  return (
    <Box component="section">
      <SnackBarReuse type={type} message={message} setError={setMessage} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
                align="center"
              >
                Thống kê đặt phòng
              </Typography>
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
              <Typography
                color="#1976d2"
                fontSize="24px"
                fontWeight="700"
                textAlign="center"
                mb={2}
              >
                Danh sách đặt phòng
              </Typography>
              <TableBooking
                data={data!}
                columns={columnBooking}
                detail={false}
              />
            </Paper>
          </Grid>
        </Grid>
        <CopyRight sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default Bookingmanager;
