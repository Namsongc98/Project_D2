

enum StatusPayment {
  pending = "Pending",
  success = "Success",
}

type PatchBooking = {
  booking_status: BookingType
};

enum BookingStatus {
  pending = "Pending",
  success = "Success",
  emtry = "Empty",
  cancel = "Cancel",
  pendingCancel = "Pendng Cancel"
}

type BookingType = BookingStatus.cancel | BookingStatus.emtry | BookingStatus.pending | BookingStatus.success | BookingStatus.pendingCancel
interface IBookingData {
  id?: number;
  id_touris: number;
  host_id: string;
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
  count_date?: number;
  count_person?: number;
  pay_status?: StatusPayment;
  total: number;
  complete_touris: boolean;
  [key: string]: any; 
}

export { StatusPayment, BookingStatus };
export type { IBookingData, PatchBooking, BookingType };
