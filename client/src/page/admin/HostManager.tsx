import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { CopyRight, TableRoomApprove } from "../../component/componentPage";
import { useEffect, useState } from "react";
import { getAllRoom } from "../../service";

const HostManager = () => {
  const [rooms, setRoom] = useState([] as any);

  const getRoom = async () => {
    try {
      const res = await getAllRoom();
      setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoom();
  }, []);
  return (
    <>
      <Box component="section">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} spacing={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  mb: 5,
                }}
              >
                <Typography
                  sx={{}}
                  color="#1976d2"
                  fontSize="24px"
                  fontWeight="700"
                >
                  Quản lý người tạo phòng
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TableRoomApprove data={rooms} getdata={getRoom} />
              </Paper>
            </Grid>
          </Grid>
          <CopyRight sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
};

export default HostManager;
