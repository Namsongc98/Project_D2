import { AlertColor, Box, Button, Divider, Paper, Stack } from "@mui/material";

import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getBookingUser,
  getBookingUserStatus,
  getOneRoom,
  patchBookingConfirm,
  payment,
} from "../../service";
import imgEmpty from "../../assets/image/img_empty.png";
import {
  BookingStatus,
  BookingType,
  IBookingData,
  StatusPayment,
  typeGetRoom,
} from "../../type";
import { convertDateToTimestamp, formatcurrency } from "../../common";
import { ModalComponent } from "../../component/componentReuse";
import DetailComponent from "../../component/componentReuse/DetailComponent";
import SnackBarReuse from "../../component/componentReuse/SnackBarReuse";
import { useSelector } from "react-redux";
import { getUser } from "../../store/reducer/userSlice";

const HistoryBooking = () => {
  const [searchParams] = useSearchParams();
  const [bookingArr, setBookingArr] = useState<IBookingData[]>([]);
  const user = useSelector(getUser);
  const type = searchParams.get("type");
  const [openInfor, setOpenInfor] = useState(false);
  const [inforBooking, setInforBooking] = useState<IBookingData>();
  const [inforRoom, setInforRoom] = useState<typeGetRoom>();
  const [typeErr, setTypeErr] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState("");

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

  const checkTypeParam = () => {
    if (user) {
      if (type === "1") {
        getBookingStatus(user!.id, BookingStatus.pending, false);
        return;
      } else if (type === "2") {
        getBookingStatus(user!.id, BookingStatus.success, false);
        return;
      } else if (type === "3") {
        getBookingStatus(user!.id, BookingStatus.success, true);
        return;
      } else if (type === "4") {
        getBookingStatus(user!.id, BookingStatus.cancel, false);
        return;
      } else {
        getBooking(user!.id);
        return;
      }
    }
  };

  useLayoutEffect(() => {
    checkTypeParam();
  }, [type, user]);

  const handleCancel = (idBooking: number) => {
    const bookingStatus = {
      booking_status: BookingStatus.pendingCancel,
    };
    try {
      patchBookingConfirm(idBooking, bookingStatus);
      setTypeErr("info");
      setMessage("Đợi xác nhận");
      setOpenInfor(false);
      checkTypeParam();
    } catch (error) {
      throw new Error();
    }
  };
  const handlePayment = (inforBooking: IBookingData) => {
    const bookingStatus = {
      pay_status: StatusPayment.success,
    };
    try {
      payment(inforBooking, bookingStatus);
      setTypeErr("info");
      setMessage("Thanh toán thành công");
      setOpenInfor(false);
      checkTypeParam();
    } catch (error) {
      if (error instanceof Error) throw new Error();
    }
  };

  const handleOpenInfor = async (
    booking: IBookingData | undefined = undefined
  ) => {
    try {
      if (booking?.id_touris) {
        const res = await getOneRoom(booking.id_touris);
        setInforRoom(res.data);
      }
      setInforBooking(booking);
      setOpenInfor(!openInfor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", overflow: "auto", height: "500px" }}>
        <SnackBarReuse type={typeErr} message={message} setError={setMessage} />
        <Paper sx={{ p: 2, width: "100%" }}>
          <Stack width={"100%"} spacing={2}>
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
                          -{" "}
                          {convertDateToTimestamp(
                            booking.end_date - 24 * 60 * 60 * 1000
                          )}
                        </p>
                        <p className="text-sm opacity-80 mt-1">
                          Số lượng người:
                        </p>
                        <p className="text-sm  mt-1">
                          <span className="opacity-80">
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
                                BookingStatus.pendingCancel
                              ? "Chờ xác nhận hủy phòng"
                              : ""}
                          </span>
                        </p>
                        <p className="text-sm  mt-1">
                          <span className="opacity-80">Chuyến đi: </span>
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
                              ? "Chờ thanh toán"
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
                        <Stack
                          sx={{ mt: 2 }}
                          direction="row"
                          spacing={2}
                          justifyContent={"space-between"}
                        >
                          <div></div>
                          <Button
                            variant="outlined"
                            onClick={() => handleOpenInfor(booking)}
                          >
                            Chi tiết
                          </Button>
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
                    src={imgEmpty}
                    width={100}
                    height={100}
                    alt={imgEmpty}
                    className="mx-auto my-0"
                  />
                  <p className="text-center mt-2">Đơn hàng trống</p>
                </div>
              </Stack>
            )}
          </Stack>
        </Paper>

        <ModalComponent setOpen={setOpenInfor} open={openInfor}>
          <>
            <DetailComponent booking={inforBooking!} room={inforRoom!} />
            <Divider light sx={{ my: 2 }} />
            <div className="flex justify-between">
              <div className=""></div>
              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCancel(inforBooking!.id!)}
                  disabled={
                    inforBooking?.pay_status === StatusPayment.success
                      ? true
                      : false
                  }
                >
                  Hủy đơn
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  disabled={
                    inforBooking?.booking_status === BookingStatus.success &&
                    inforBooking?.pay_status === StatusPayment.pending
                      ? false
                      : true
                  }
                  onClick={() => handlePayment(inforBooking!)}
                >
                  Thanh toán
                </Button>
              </Stack>
            </div>
          </>
        </ModalComponent>
      </Box>
    </>
  );
};

export default HistoryBooking;
