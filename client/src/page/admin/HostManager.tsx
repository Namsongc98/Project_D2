import { Box, Container, Grid, Paper } from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import { useEffect, useState } from "react";
import { getAllRoom } from "../../service";
import { convertDateToTimestamp } from "../../common";

const HoistManager = () => {
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
  console.log(rooms);
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
                <Orders data={rooms} />
              </Paper>
            </Grid>
          </Grid>
          <CopyRight sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
};

export default HoistManager;
