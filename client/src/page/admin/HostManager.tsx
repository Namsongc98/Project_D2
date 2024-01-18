import { Box, Container, Grid, Paper } from "@mui/material";
import { CopyRight, TableRoomApprove } from "../../component/componentPage";
import { useEffect, useState } from "react";
import { getAllRoom } from "../../service";

const HostManager = () => {
  const [rooms, setRoom] = useState([] as any);

  // const getData =
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
