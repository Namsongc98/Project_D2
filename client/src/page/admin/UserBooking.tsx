import { AlertColor, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { columnBooking } from "../../constain";
import { useParams, useSearchParams } from "react-router-dom";
import { BookingStatus, BookingType } from "../../type";
import { getBookingUser, getBookingUserStatus } from "../../service";
import { SnackBarReuse, TableBooking } from "../../component/componentReuse";

const UserBooking = () => {
  const [data, setData] = useState([]);
  const param = useParams();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("user");
  const [type, setType] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState<string>("");

  const getBooking = async (userId: string) => {
    try {
      const res = await getBookingUser(userId);
      setData(res.data);
    } catch (error) {
      setType("error");
      setMessage("error sever");
    }
  };

  const getBookingStatus = async (
    userId: string,
    bookingStatus: BookingType,
    complete: boolean
  ) => {
    try {
      const res = await getBookingUserStatus(userId, bookingStatus, complete);
      setData(res.data);
    } catch (error) {
      setType("error");
      setMessage("error sever");
    }
  };

  const checkTypeParam = () => {
    if (param.id) {
      if (userType === "1") {
        getBookingStatus(param.id, BookingStatus.pending, false);
        return;
      } else if (userType === "2") {
        getBookingStatus(param.id, BookingStatus.success, false);
        return;
      } else if (userType === "3") {
        getBookingStatus(param.id, BookingStatus.success, true);
        return;
      } else if (userType === "4") {
        getBookingStatus(param.id, BookingStatus.cancel, false);
        return;
      } else {
        getBooking(param!.id);
        return;
      }
    }
  };

  useEffect(() => {
    checkTypeParam();
  }, [userType]);
  return (
    <>
      <SnackBarReuse type={type} message={message} setError={setMessage} />
      <Grid item xs={12} md={12} lg={12}>
        <TableBooking data={data!} columns={columnBooking} detail={true} />
      </Grid>
    </>
  );
};

export default UserBooking;
