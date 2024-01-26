import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { TableHostRoomConfirm } from "../../component/componentPage";
import { useSearchParams } from "react-router-dom";
import { useGetUser } from "../../hook";
import { BookingStatus, BookingType, IBookingData } from "../../type";
import { getBookingUser, getBookingUserStatus } from "../../service";

const BookingHostStatus = () => {
  const [bookingArr, setBookingArr] = useState<IBookingData[]>([]);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const user = useGetUser();

  const getBookingStatus = async (
    userId: string,
    bookingStatus: BookingType,
    complete: boolean
  ) => {
    try {
      const res = await getBookingUserStatus(userId, bookingStatus, complete);
      setBookingArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooking = async (userId: string) => {
    try {
      const res = await getBookingUser(userId);
      setBookingArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      if (type === "1") {
        getBookingStatus(user!.id, BookingStatus.pending, false);
      } else if (type === "2") {
        getBookingStatus(user!.id, BookingStatus.success, false);
      } else if (type === "3") {
        getBookingStatus(user!.id, BookingStatus.success, true);
      } else if (type === "4") {
        getBookingStatus(user!.id, BookingStatus.pendingCancel, false);
      } else if (type === "5") {
        getBookingStatus(user!.id, BookingStatus.cancel, false);
      } else {
        getBooking(user!.id);
      }
    }
  }, [type, user]);
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <TableHostRoomConfirm data={bookingArr!} />
      </Paper>
    </Grid>
  );
};

export default BookingHostStatus;
