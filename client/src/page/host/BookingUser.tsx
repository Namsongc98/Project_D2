import { useEffect, useState } from "react";
import { getBookingUserHost, getBookingUserHostStatus } from "../../service";
import { BookingStatus, BookingType } from "../../type";
import { useParams, useSearchParams } from "react-router-dom";
import { AlertColor, Grid } from "@mui/material";
import { columnBooking } from "../../constain";
import { useGetUser } from "../../hook";
import { SnackBarReuse, TableBooking } from "../../component/componentReuse";

const BookingUser = () => {
  const [data, setData] = useState([]);
  const param = useParams();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("user");
  const host = useGetUser();
  const [type, setType] = useState<AlertColor | undefined>();
  const [error, setError] = useState("");

  const getBooking = async (userId: string, hostId: string) => {
    try {
      const res = await getBookingUserHost(userId, hostId);
      setData(res.data);
    } catch (error) {
      setType("error");
      setError("Không lấy được dữ liệu");
    }
  };

  const getBookingStatus = async (
    userId: string,
    hostId: string,
    bookingStatus: BookingType,
    complete: boolean
  ) => {
    try {
      const res = await getBookingUserHostStatus(
        userId,
        hostId,
        bookingStatus,
        complete
      );
      setData(res.data);
    } catch (error) {
      setType("error");
      setError("Không lấy được dữ liệu");
    }
  };
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
      <SnackBarReuse type={type} message={error} setError={setError} />
      <TableBooking
        data={data!}
        columns={columnBooking}
        detail={true}
        getData={checkTypeParam}
      />
    </Grid>
  );
};

export default BookingUser;
