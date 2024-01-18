import { BookingStatus } from "."

enum StatusPayment {
    pending = "Pending",
    success = "Success"
}

type PatchBooking = {
    pay_status: StatusPayment
}

interface IBookingData {
    id: number,
    id_touris?: number,
    user_id?: string,
    name_user: string,
    phone: number,
    email: string,
    name_room: string,
    booking_status: BookingStatus,
    start_date: number,
    end_date: number,
    cout_persion?: number,
    payment?: number,
    pay_status?: StatusPayment
}



export { StatusPayment }
export type { IBookingData, PatchBooking }