import {
  Box,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { getAllRoomHostNav } from "../../service";
import { useEffect, useState } from "react";
import { useGetUser } from "../../hook";

const CalendarHost = () => {
  const [arrRoom, setArrRoom] = useState([] as any[]);
  const user = useGetUser();
  const { state } = useLocation()
  useEffect(() => {
    (async () => {
      try {
        if (user?.id) {
          const res = await getAllRoomHostNav(user.id);
          setArrRoom(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

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
          <Grid item xs={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <List>
                <Typography color="#1976d2" fontSize="24px" fontWeight="700">
                  Danh sách phòng
                </Typography>
                {arrRoom?.map((room) => (
                  <NavLink
                    key={room.id}
                    to={room.room}
                    state={{ id: room.id }}
                    className={state.id === room.id ? "text-[#1976d2]" : ""}
                  >
                    <ListItemButton key={room.id} component="nav">
                      <ListItemText primary={room.name} />
                    </ListItemButton>
                  </NavLink>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper sx={{ p: 2 }}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalendarHost;
