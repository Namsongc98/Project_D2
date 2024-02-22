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
import { useLocation } from "react-router-dom";
import { getAllRoomHostNav, getBookingCarendar } from "../../service";
import { useEffect, useState } from "react";
import { useGetUser } from "../../hook";
import { IRoomPost } from "../../type";
import { CalendarHostParam } from ".";

const CalendarHost = () => {
  const [arrRoom, setArrRoom] = useState([] as any[]);
  const [arrBooking, setArrBooking] = useState([] as any[]);

  const [checkAll, setCheckAll] = useState(false);
  const user = useGetUser();
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        if (user?.id) {
          const res = await getAllRoomHostNav(user.id);
          setArrRoom(
            res.data.map((room: IRoomPost) => ({
              ...room,
              active: room.id! === state.id ? true : false,
            }))
          );
          const result = await getBookingCarendar(state.id);
          setArrBooking(result)
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
    const roomsCopy = [...arrRoom];
    const roomFind = arrRoom.find((car) => car.id === room.id);
    roomFind.active = !roomFind.active;
    if (!roomFind.active && checkAll) {
      handleSelectAll();
    }

    setArrRoom(roomsCopy);
    let flag = true;
    for (let i = 0; i < arrRoom.length; i++) {
      flag = flag && arrRoom[i].active;
    }
    if (flag && !checkAll) {
      handleSelectAll();
    }
  };

  const handleSelectAll = () => {
    setCheckAll((prevState) => !prevState);
    setArrRoom(arrRoom.map((room) => ({ ...room, active: !checkAll })));
  };
  const getBookingArr = async (arrRoom: IRoomPost[]) => {
    try {
      const result = await Promise.all(arrRoom.map((room) => getBookingCarendar(room.id!)))
      setArrBooking(result.flat())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const copyArrRoom = (arrRoom.filter((room) => (room.active)))
    getBookingArr(copyArrRoom)
  }, [arrRoom])

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
                    <Checkbox checked={checkAll} onChange={handleSelectAll} />
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
              <CalendarHostParam data={arrBooking} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalendarHost;
