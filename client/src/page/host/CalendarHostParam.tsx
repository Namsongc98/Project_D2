import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import {
  DetailComponent,
  ModalComponent,
} from "../../component/componentReuse";
import { getBookingCarendar, getOneRoom } from "../../service";
import { IRoomPost, typeGetRoom } from "../../type";

import { useLocation } from "react-router-dom";

const CalendarHostParam = () => {
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

  function renderEventContent(eventInfo: any) {
    return (
      <div className="">
        <i className="text-red">{eventInfo.event.title}</i>
      </div>
    );
  }
  return (
    <>
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
      <ModalComponent setOpen={setOpenInfor} open={openInfor}>
        <DetailComponent booking={booking} room={room} />
      </ModalComponent>
    </>
  );
};

export default CalendarHostParam;
