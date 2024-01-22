import { patchStatusBooking } from ".";
import { instance } from "../config";
import { BookingStatus, IBookingData, PatchBooking } from "../type";


//  lấy data Booking status pending
const getBookingPending = async () => {
    return await instance.get(`/bookings/`, { params: { booking_status: BookingStatus.pending } });
}

// data booking statust success
const getBookingSuccess = async () => {
    const res = await instance.get(`/bookings/`, { params: { booking_status: BookingStatus.success } });
    return res
}


// tạo booking 
const createBooking = async (booking: IBookingData) => {
    const bookingStatus: PatchBooking = { booking_status: BookingStatus.pending }
    patchStatusBooking(booking.id_touris!, bookingStatus)
    return await instance.post(`/bookings/`, booking);
}

// cho phép người dùng đặt phòng
const patchBookingConfirm = async (idBooking: number, bookingStatus: PatchBooking) => {
    await instance.patch(`/bookings/${idBooking}`, bookingStatus);
    patchStatusBooking(idBooking, bookingStatus)
    return
}



const getBookingUser = async (userId: string) => {

    return await instance.get('/bookings', { params: { user_id: userId } })
}

export { patchBookingConfirm, getBookingPending, getBookingSuccess, createBooking, getBookingUser }