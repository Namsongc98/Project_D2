import { BookingStatus } from ".";

enum StatusPayment {
  pending = "Pending",
  success = "Success",
}

type PatchBooking = {
  booking_status: BookingStatus.success | BookingStatus.emtry |  BookingStatus.pending;
};

interface IBookingData {
  id?: number;
  id_touris?: number;
  user_id?: string;
  name_user: string;
  phone: number;
  email: string;
  name_room: string;
  booking_status: BookingStatus;
  start_date: number;
  end_date: number;
  cout_persion?: number;
  price?: number;
  pay_status?: StatusPayment;
  total: number;
}

export { StatusPayment };
export type { IBookingData, PatchBooking };
