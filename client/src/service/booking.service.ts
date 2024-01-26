import { patchStatusBooking } from ".";
import { instance } from "../config";
import { BookingStatus, BookingType, IBookingData, PatchBooking } from "../type";


//  lấy data Booking status pending
const getBookingStatus = async (host_id: string, booking_status: BookingType) => {
    return await instance.get(`/bookings/`, { params: { booking_status, host_id } });
}

// tạo booking 
const createBooking = async (booking: IBookingData) => {
    const bookingStatus: PatchBooking = { booking_status: BookingStatus.pending }
    await patchStatusBooking(booking.id_touris!, bookingStatus)
    return await instance.post(`/bookings/`, booking);
}

// cho phép người dùng đặt phòng
const patchBookingConfirm = async (idBooking: number, bookingStatus: PatchBooking) => {
    await instance.patch(`/bookings/${idBooking}`, bookingStatus);
    await patchStatusBooking(idBooking, bookingStatus)
    return
}

const getBookingService = async () => {
    return await instance.get('/bookings')
}
const getBookingUser = async (userId: string) => {
    return await instance.get('/bookings', { params: { user_id: userId } })
}

const getBookingHostId = async (host_id: string) => {
    return await instance.get('/bookings', { params: { host_id } })
}

const getBookingUserStatus = async (user_id: string, booking_status: BookingType, complete_touris: boolean) => {
    const booking = await instance.get("./bookings", { params: { user_id, booking_status, complete_touris } })
    return booking
}

export { patchBookingConfirm, getBookingStatus, createBooking, getBookingUser, getBookingService, getBookingHostId, getBookingUserStatus }