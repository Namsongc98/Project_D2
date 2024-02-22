import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import {
  DetailComponent,
  ModalComponent,
} from "../../component/componentReuse";
import { getBookingCarendar, getOneRoom } from "../../service";
import { BookingStatus, IRoomPost, typeGetRoom } from "../../type";
import { useLocation } from "react-router-dom";
const CalendarAdminParam = () => {
  const [booking, setbooking] = useState<any[]>([] as any);
  const [room, setRoom] = useState<typeGetRoom | undefined>();
  const [openInfor, setOpenInfor] = useState(false);
  const [arrBooking, setArrBooking] = useState<any[]>([] as any);
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
              .padStart(2, "0")}-${startDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            const endDate = new Date(booking.end_date);
            const end = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${endDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            const BookingPending =
              booking.booking_status === BookingStatus.pending;
            const BookingSuccess =
              booking.booking_status === BookingStatus.success;
            const BookingpendingCancel =
              booking.booking_status === BookingStatus.pendingCancel;
            return {
              ...booking,
              title: BookingPending
                ? "Khách chờ duyệt phòng"
                : BookingSuccess
                ? "Phòng có khách đặt"
                : BookingpendingCancel
                ? "Khách chờ hủy phòng"
                : "Khách hủy phòng",
              backgroundColor: BookingPending
                ? "#1796D2"
                : BookingSuccess
                ? "rgb(34 197 94)"
                : BookingpendingCancel
                ? "Khách chờ hủy phòng"
                : "#ef4444",
              borderColor: BookingPending
                ? "#1796D2"
                : BookingSuccess
                ? "rgb(34 197 94)"
                : BookingpendingCancel
                ? "Khách chờ hủy phòng"
                : "#ef4444",
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

  function renderEventContent(eventInfo: any) {
    return (
      <div className="">
        <i className="">{eventInfo.event.title}</i>
      </div>
    );
  }
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventContent={renderEventContent}
        events={arrBooking}
        eventClick={(clickInfo) => eventClick(clickInfo)}
        eventColor="black"
        eventBackgroundColor="black"
        eventDisplay="block"
      />
      <ModalComponent setOpen={setOpenInfor} open={openInfor}>
        <DetailComponent booking={booking} room={room} />
      </ModalComponent>
    </>
  );
};

export default CalendarAdminParam;
