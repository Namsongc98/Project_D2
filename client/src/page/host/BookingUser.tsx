import { useEffect, useState } from "react";
import { getBookingUserHost, getBookingUserHostStatus } from "../../service";
import { BookingStatus, BookingType } from "../../type";
import { useParams, useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { columnBooking } from "../../constain";
import { TableBooking } from "../../component/componentPage";
import { useGetUser } from "../../hook";

const BookingUser = () => {
  const [data, setData] = useState([]);
  const param = useParams();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("user");
  const host = useGetUser();

  const getBooking = async (userId: string, hostId: string) => {
    try {
      const res = await getBookingUserHost(userId, hostId);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingStatus = async (
    userId: string,
    hostId: string,
    bookingStatus: BookingType,
    complete: boolean
  ) => {
    try {
      const res = await getBookingUserHostStatus(userId, hostId, bookingStatus, complete);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  const checkTypeParam = () => {
    if (param.id && host?.id) {
      if (userType === "1") {
        getBookingStatus(param.id, host?.id, BookingStatus.pending, false);
        return;
      } else if (userType === "2") {
        getBookingStatus(param.id, host?.id, BookingStatus.success, false);
        return;
      } else if (userType === "3") {
        getBookingStatus(param.id, host?.id, BookingStatus.success, true);
        return;
      } else if (userType === "4") {
        getBookingStatus(param.id, host?.id, BookingStatus.cancel, false);
        return;
      } else {
        getBooking(param!.id, host?.id);
        return;
      }
    }
  };

  useEffect(() => {
    checkTypeParam();
  }, [userType, host]);
  return (
    <Grid item xs={12} md={12} lg={12}>
      <TableBooking data={data!} columns={columnBooking} detail={true} getData={checkTypeParam}/>
    </Grid>
  );
};

export default BookingUser;
