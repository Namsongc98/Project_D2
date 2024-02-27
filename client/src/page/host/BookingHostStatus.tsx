import { AlertColor, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { TableHostRoomConfirm } from "../../component/componentPage";
import { useSearchParams } from "react-router-dom";
import { useGetUser } from "../../hook";
import { BookingStatus, BookingType, IBookingData } from "../../type";
import { getBookingHost, getBookingHostStatus } from "../../service";
import { columnBooking } from "../../constain";
import { SnackBarReuse } from "../../component/componentReuse";

const BookingHostStatus = () => {
  const [bookingArr, setBookingArr] = useState<IBookingData[]>([]);
  const [typeError, setTypeError] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState<string>("");
  const [searchParams] = useSearchParams();
  const type = searchParams.get("booking");
  const host = useGetUser();

  const getBookingStatus = async (
    userId: string,
    bookingStatus: BookingType,
    complete: boolean
  ) => {
    try {
      const res = await getBookingHostStatus(userId, bookingStatus, complete);
      setBookingArr(res.data);
    } catch (error) {
      setTypeError("error");
      setMessage("error sever");
    }
  };

  const getBooking = async (hostId: string) => {
    try {
      const res = await getBookingHost(hostId);
      setBookingArr(res.data);
    } catch (error) {
      setTypeError("error");
      setMessage("error sever");
    }
  };

  const checkParams = () => {
    if (host) {
      if (type === "1") {
        getBookingStatus(host!.id, BookingStatus.pending, false);
      } else if (type === "2") {
        getBookingStatus(host!.id, BookingStatus.success, false);
      } else if (type === "3") {
        getBookingStatus(host!.id, BookingStatus.success, true);
      } else if (type === "4") {
        getBookingStatus(host!.id, BookingStatus.pendingCancel, false);
      } else if (type === "5") {
        getBookingStatus(host!.id, BookingStatus.cancel, false);
      } else {
        getBooking(host!.id);
      }
    }
  };

  useEffect(() => {
    checkParams();
  }, [type, host]);
  return (
    <Grid item xs={12}>
      <SnackBarReuse type={typeError} message={message} setError={setMessage} />
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <TableHostRoomConfirm
          data={bookingArr!}
          columns={columnBooking}
          detail={false}
          getData={checkParams}
          user={host!}
        />
      </Paper>
    </Grid>
  );
};

export default BookingHostStatus;
