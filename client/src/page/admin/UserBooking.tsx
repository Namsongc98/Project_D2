import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { TableBooking } from "../../component/componentPage";
import { columnBooking } from "../../constain";
import { useParams, useSearchParams } from "react-router-dom";
import { BookingStatus, BookingType } from "../../type";
import { getBookingUser, getBookingUserStatus } from "../../service";

const UserBooking = () => {
  const [data, setData] = useState([]);
  const param = useParams();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("user");

  const getBooking = async (userId: string) => {
    try {
      const res = await getBookingUser(userId);
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      <Grid item xs={12} md={12} lg={12}>
        <TableBooking data={data!} columns={columnBooking} detail={true} getData={checkTypeParam}/>
      </Grid>
    </>
  );
};

export default UserBooking;
