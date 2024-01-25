import { Box, Button, Divider, Paper, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBookingUser, getBookingUserStatus } from "../../service";
import { useGetUser } from "../../hook";
import imgEmtry from "../../assets/image/img_emtry.png";
import {
  BookingStatus,
  BookingType,
  IBookingData,
  StatusPayment,
} from "../../type";
import { convertDateToTimestamp, formatcurrency } from "../../common";

const HistoryBooking = () => {
  const [searchParams] = useSearchParams();
  const [bookingArr, setBookingArr] = useState<IBookingData[]>([]);
  const user = useGetUser();
  const type = searchParams.get("type");
  const getBooking = async (userId: string) => {
    try {
      const res = await getBookingUser(userId);
      setBookingArr(res.data);
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
        getBookingStatus(user!.id, BookingStatus.cancel, false);
      } else {
        getBooking(user!.id);
      }
    }
  }, [type, user]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ p: 2, width: "100%" }}>
          <Box width={"100%"}>
            {bookingArr.length ? (
              bookingArr?.map((booking) => {
                return (
                  <Paper key={booking.id} sx={{ p: 2 }} elevation={1}>
                    <Stack
                      direction="row"
                      flexWrap={"wrap"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      alignItems={"start"}
                      spacing={2}
                    >
                      <div className="">
                        <p className="font-medium text-lg opacity-80">
                          {booking.name_room}
                        </p>
                        <p className="text-sm opacity-80 mt-1">
                          Từ ngày: {convertDateToTimestamp(booking.start_date)}{" "}
                          - {convertDateToTimestamp(booking.end_date)}
                        </p>
                        <p className="text-sm opacity-80 mt-1">
                          Số lượng người:
                        </p>
                        <p className="text-sm  mt-1">
                          <span className="opacity-80">
                            {" "}
                            Xác nhận lịch đặt:{" "}
                          </span>
                          <span className="font-medium">
                            {booking.booking_status === BookingStatus.pending
                              ? "Chờ xác nhận"
                              : booking.booking_status === BookingStatus.cancel
                              ? "Hủy phòng"
                              : booking.booking_status === BookingStatus.success
                              ? "Đặt phòng thành công"
                              : booking.booking_status ===
                                BookingStatus.pendngCancel
                              ? "Chờ xác nhận hủy phòng"
                              : ""}
                          </span>
                        </p>
                        <p className="text-sm  mt-1">
                          <span className="opacity-80">Chuyến đi:</span>
                          <span className="font-medium">
                            {booking.complete_touris
                              ? "Hoàn thành"
                              : "Đang thực hiện"}
                          </span>
                        </p>
                        <p className="text-sm  mt-1">
                          <span className="opacity-80">Thanh toán: </span>
                          <span className="font-medium">
                            {booking.pay_status === StatusPayment.pending
                              ? "chờ thanh toán"
                              : "Đã thanh toán"}
                          </span>
                        </p>
                        <Stack direction={"row"} spacing={1} mt={1}></Stack>
                      </div>
                      <div className="text-right">
                        <p className="text-red-500 font-medium">
                          {formatcurrency(booking.price!)}
                        </p>
                        <p className="text-red-500 font-medium">
                          {booking.count_date} Ngày
                        </p>
                        <p className="text-red-500 font-medium">
                          {booking.count_person} Người
                        </p>
                      </div>
                    </Stack>
                    <Divider sx={{ my: 2 }} light />
                    <Stack direction="row" justifyContent={"space-between"}>
                      <div className=""></div>
                      <div className="">
                        <div className="text-right">
                          <span>Thanh toán: </span>
                          <span className="text-red-500 font-medium">
                            {formatcurrency(booking.total)}
                          </span>
                        </div>
                        <Stack sx={{ mt: 2 }} direction="row" spacing={2}>
                          <Button variant="outlined">Đặt lại</Button>
                          <Button variant="outlined">Chi tiết</Button>
                        </Stack>
                      </div>
                    </Stack>
                  </Paper>
                );
              })
            ) : (
              <Stack
                sx={{ height: "300px" }}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <div className="">
                  <img
                    src={imgEmtry}
                    width={100}
                    height={100}
                    alt={imgEmtry}
                    className="mx-auto my-0"
                  />
                  <p className="text-center mt-2">Đơn hàng trống</p>
                </div>
              </Stack>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default HistoryBooking;
