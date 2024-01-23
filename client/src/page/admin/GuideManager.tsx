import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight, TableUser } from "../../component/componentPage";
import TableBooking from "../../component/componentPage/admin/TableBooking";
import { useEffect, useState } from "react";
import { getAllUser, getBookingService } from "../../service";

const GuideManager = () => {
  const [data, setData] = useState();
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    getBooking();
    getUser();
  }, []);

  const getBooking = async () => {
    try {
      const res = await getBookingService();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await getAllUser();

      setDataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataUser);
  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} spacing={3}>
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
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TableBooking data={data!} getData={getBooking} />
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
              <TableUser data={dataUser!}  />
            </Paper>
          </Grid>
        </Grid>

        <CopyRight sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default GuideManager;
