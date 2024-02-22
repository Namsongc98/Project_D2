import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { getAllRoomHostNav } from "../../service";
import { useEffect, useState } from "react";
import { useGetUser } from "../../hook";
import { IRoomPost } from "../../type";
import { CalendarHostParam } from ".";

const CalendarHost = () => {
  const [arrRoom, setArrRoom] = useState([] as any[]);
  const [copyArrRoom, setCopyArrRoom] = useState([] as any[]);
  const [checkAll, setCheckAll] = useState(false);
  const user = useGetUser();
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        if (user?.id) {
          const res = await getAllRoomHostNav(user.id);
          setArrRoom(
            res.data.map((room) => ({
              ...room,
              active: room.id === state.id ? true : false,
            }))
          );
          setCopyArrRoom(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, state]);

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    room: IRoomPost
  ) => {
    console.log(room);
  };

  const handleselectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckAll((prevState) => !prevState);
    setArrRoom(arrRoom.map((room) => ({ ...room, active: !checkAll })));
  };

  return (
    <Box component="section">
      <Container sx={{ my: 4, mx: 2 }} maxWidth={false}>
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
                p: 1,
                height: "100%",
              }}
            >
              <List>
                <Typography
                  color="#1976d2"
                  fontSize="24px"
                  fontWeight="700"
                  sx={{ pl: 1 }}
                >
                  Danh sách phòng
                </Typography>
                <FormControlLabel
                  label="Chọn tất cả"
                  control={
                    <Checkbox checked={checkAll} onChange={handleselectAll} />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {arrRoom.map((room) => (
                    <FormControlLabel
                      key={room.id}
                      label={room.name}
                      control={
                        <Checkbox
                          checked={room.active}
                          onChange={(e) => handleChange(e, room)}
                        />
                      }
                      sx={{ color: room.active ? "#1976d2" : "" }}
                    />
                  ))}
                </Box>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper sx={{ p: 2 }}>
              <CalendarHostParam data={copyArrRoom} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalendarHost;
