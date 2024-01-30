import { getUserHostId, patchStatusBooking } from ".";
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
    const res = await instance.post(`/bookings/`, booking);
    const bookingUser = { id_user: booking.user_id, id_host: res.data.host_id }
    await instance.post("/user_booking/", bookingUser)
    return res
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

const getBookingHostId = async (id_host: string) => {
    const res = await instance.get("user_booking", { params: { id_host } })
    console.log(res.data)
    try {
        const data = Promise.all(res.data.map((item: { id: number, id_user: string, id_host: string }) => (

            getUserHostId(item.id_user)
        )))

        return data
    } catch (error) {
        throw new Error("user Ivalid")
    }

}

const getBookingUserHost = async (user_id: string, host_id: string) => {

    return await instance.get('/bookings', { params: { user_id, host_id } })
}
const getBookingUserHostStatus = async (user_id: string, host_id: string, booking_status: BookingType, complete_touris: boolean) => {
    const booking = await instance.get("/bookings", { params: { user_id, host_id, booking_status, complete_touris } })
    return booking
}


const getBookingHost = async (host_id: string) => {
    return await instance.get("/bookings/", { params: { host_id } })
}
const getBookingHostStatus = async (user_id: string, booking_status: BookingType, complete_touris: boolean) => {
    const booking = await instance.get("/bookings", { params: { user_id, booking_status, complete_touris } })
    return booking
}

const getBookingUser = async (user_id: string) => {
    return await instance.get('/bookings', { params: { user_id } })
}

const getBookingUserStatus = async (user_id: string, booking_status: BookingType, complete_touris: boolean) => {
    const booking = await instance.get("/bookings", { params: { user_id, booking_status, complete_touris } })
    return booking
}

export { patchBookingConfirm, getBookingStatus, createBooking, getBookingUserHost, getBookingService, getBookingHostId, getBookingUserHostStatus, getBookingHost, getBookingHostStatus, getBookingUser, getBookingUserStatus }