import { instance } from "../config";
import { PatchBooking } from "../type";

const getBookingPending = async () => {
    return await instance.get(`/bookings/`, { params: { booking_status: "Pending" } });
}
const getBookingSuccess = async () => {
    const res = await instance.get(`/bookings/`, { params: { booking_status: "Success" } });
    return res
}

const patchBookingConfirm = async (idBooking: number, bookingStatus: PatchBooking) => {
    return await instance.patch(`/bookings/${idBooking}`, bookingStatus);
}
export { patchBookingConfirm, getBookingPending, getBookingSuccess }