import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingCarendar, getOneRoom } from "../../service";
import { IRoomPost, typeGetRoom } from "../../type";
import {
  DetailComponent,
  ModalComponent,
} from "../../component/componentReuse";

const CalendarHost = () => {
  const [arrBooking, setArrBooking] = useState<any[]>([] as any);
  const [booking, setbooking] = useState<any[]>([] as any);
  const [room, setRoom] = useState<typeGetRoom | undefined>();
  const [openInfor, setOpenInfor] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        const res = await getBookingCarendar(state.id);
        const eventsCarendar: any[] = [
          ...res.data.map((booking: IRoomPost) => {
            const startDate = new Date(booking.start_date);
            const start = `${startDate.getFullYear()}-${(
              startDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${startDate.getDate()}`;
            const endDate = new Date(booking.end_date);
            const end = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${endDate.getDate()}`;
            return {
              ...booking,
              title: "Phòng có khách đặt",
              start,
              end,
            };
          }),
        ];
        setArrBooking(eventsCarendar);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.id]);

  const eventClick = async (clickInfo: any) => {
    try {
      setbooking(clickInfo.event.extendedProps);
      const res = await getOneRoom(clickInfo.event.extendedProps.id_touris);
      setRoom(res.data);
      setOpenInfor(!openInfor);
    } catch (error) {
      throw new Error("");
    }
  };
  console.log(room);

  function renderEventContent(eventInfo: any) {
    return (
      <div className="">
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
                events={arrBooking}
                eventClick={(clickInfo) => eventClick(clickInfo)}
              />
            </Paper>
          </Grid>
        </Grid>
        <ModalComponent setOpen={setOpenInfor} open={openInfor}>
          <DetailComponent booking={booking} room={room} />
        </ModalComponent>
      </Container>
    </Box>
  );
};

export default CalendarHost;
