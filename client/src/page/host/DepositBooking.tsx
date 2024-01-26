import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Deposit, TableUser } from "../../component/componentPage";
import { 
  getBookingHostId } from "../../service";
import { useGetUser } from "../../hook";

const DepositBooking = () => {
  const user = useGetUser();
  const [dataUser, setDataUser] = useState([]);
  const [countBooking, setCountBooking] = useState();

  useEffect(() => {
    getBooking();
  }, [user]);

  const getBooking = async () => {
    try {
      if (user) {
        const res = await getBookingHostId(user.id);
        setDataUser(res.data);
        setCountBooking(res.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              }}
            >
              <Typography color="#1976d2" fontSize="24px" fontWeight="700">
                Quản lý người đặt phòng
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Deposit label="Số lượng booking" count={countBooking} />
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
                Danh sách người dùng
              </Typography>
              <TableUser data={dataUser!} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DepositBooking;
