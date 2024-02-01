import { checkRoomDate, getUserHostId, patchStatusBooking } from ".";
import { instance } from "../config";
import {
  BookingStatus,
  BookingType,
  IBookingData,
  PatchBooking,
} from "../type";

//  lấy data Booking status pending
const getBookingStatus = async (
  host_id: string,
  booking_status: BookingType
) => {
  return await instance.get(`/bookings/`, {
    params: { booking_status, host_id },
  });
};

// tạo booking
const createBooking = async (booking: IBookingData) => {
  const result = checkRoomDate(booking.start_date, booking.end_date)
  console.log(result)
  // const bookingStatus = { booking_status: BookingStatus.pending, start_date: booking.start_date, end_date: booking.end_date };
  // await patchStatusBooking(booking.id_touris!, bookingStatus);
  // const res = await instance.post(`/bookings/`, booking);
  // const bookingUser = { id_user: booking.user_id, id_host: res.data.host_id };
  // await instance.post("/user_booking/", bookingUser);
  // return res;
};

// cho phép người dùng đặt phòng
const patchBookingConfirm = async (
  idBooking: number,
  bookingStatus: PatchBooking
) => {
  console.log(bookingStatus)
  const result = await instance.patch(`/bookings/${idBooking}`, bookingStatus);
  await patchStatusBooking(result.data.id_touris, bookingStatus);
  return;
};

const getBookingService = async () => {
  return await instance.get("/bookings");
};

const getBookingHostId = async (id_host: string) => {
  const res = await instance.get("user_booking", { params: { id_host } });
  try {
    const data = Promise.all(
      res.data.map((item: { id: number; id_user: string; id_host: string }) =>
        getUserHostId(item.id_user)
      )
    );
    return data;
  } catch (error) {
    throw new Error("user Ivalid");
  }
};

const getBookingUserHost = async (user_id: string, host_id: string) => {
  return await instance.get("/bookings", { params: { user_id, host_id } });
};
const getBookingUserHostStatus = async (
  user_id: string,
  host_id: string,
  booking_status: BookingType,
  complete_touris: boolean
) => {
  const booking = await instance.get("/bookings", {
    params: { user_id, host_id, booking_status, complete_touris },
  });
  return booking;
};

const getBookingHost = async (host_id: string) => {
  return await instance.get("/bookings/", { params: { host_id } });
};
const getBookingHostStatus = async (
  host_id: string,
  booking_status: BookingType,
  complete_touris: boolean
) => {
  const booking = await instance.get("/bookings", {
    params: { host_id, booking_status, complete_touris },
  });
  return booking;
};

const getBookingUser = async (user_id: string) => {
  return await instance.get("/bookings", { params: { user_id } });
};

const getBookingUserStatus = async (
  user_id: string,
  booking_status: BookingType,
  complete_touris: boolean
) => {
  const booking = await instance.get("/bookings", {
    params: { user_id, booking_status, complete_touris },
  });
  return booking;
};

const checkSearchDate = async (idRoom: number) => {
  const res = await instance.get("/bookings/", { params: { id_touris: idRoom } })
  console.log(res.data)
  return res.data
}

export {
  patchBookingConfirm,
  getBookingStatus,
  createBooking,
  getBookingUserHost,
  getBookingService,
  getBookingHostId,
  getBookingUserHostStatus,
  getBookingHost,
  getBookingHostStatus,
  getBookingUser,
  getBookingUserStatus,
  checkSearchDate
};
