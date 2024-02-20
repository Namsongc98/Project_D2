import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneRoom } from "../../service";
import { BookingStatus, IRoomPost } from "../../type";

const CalendarHost = () => {
  const [room, setRoom] = useState<IRoomPost | null>();
  const [checkin, setCheckin] = useState<string | number | Date>("");
  const [checkout, setCheckout] = useState<string | number | Date>("");
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        const res = await getOneRoom(state.id);
        setRoom(res.data);
        const startDate = new Date(res.data.start_date);
        const endDate = new Date(res.data.end_date);
        setCheckin(
          `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${startDate.getDate()}`
        );
        setCheckout(
          `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${endDate.getDate()}`
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.id]);
  function renderEventContent(eventInfo: any) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <i className="text-red">{eventInfo.event.title}</i>
      </div>
    );
  }

  return (
    <Box component="section">
      <Container sx={{ mt: 4, mb: 4 }}>
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
              <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventContent={renderEventContent}
                events={[
                  {
                    title: "Phòng có khách đặt",
                    start:
                      room?.booking_status === BookingStatus.success && checkin
                        ? checkin
                        : "",
                    end:
                      room?.booking_status === BookingStatus.success && checkout
                        ? checkout
                        : "",
                    ...room,
                    display: "background",
                    textColor: "black",
                    backgroundColor: "red",
                  },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalendarHost;
