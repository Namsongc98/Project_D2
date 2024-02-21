import { instance, instance_token } from "../config";
import {
  Approve,
  ApprovePacth,
  ApproveType,
  BookingStatus,
  IBookingData,
  IRoomPost,
  PatchBooking,
  typeGetRoom,
} from "../type";

// tạo phòng
const createRoom = async (room: IRoomPost) => {
  return await instance_token.post("/touris", room);
};

// data tất cả phòng
const getAllRoom = async (page: number, limit: number) => {
  return await instance.get(`/touris?_page=${page}&_limit=${limit}`);
};

const getAllRoomApprove = async (
  page: number,
  limit: number,
  approve_room: ApproveType
) => {
  return await instance.get(`/touris?_page=${page}&_limit=${limit}`, {
    params: { approve_room },
  });
};

// lấy phòng theo host
const getAllRoomHost = async (page: number, limit: number, host_id: string) => {
  const res = await instance.get(`/touris?_page=${page}&_limit=${limit}`, {
    params: { host_id },
  });
  return res;
};
const getAllRoomHostNav = async (host_id: string) => {
  const res = await instance.get(`/touris/`, {
    params: { host_id },
  });
  return res;
};
const getAllRoomApproveHost = async (
  page: number,
  limit: number,
  host_id: string,
  approve_room: ApproveType
) => {
  return await instance.get(`/touris?_page=${page}&_limit=${limit}`, {
    params: { host_id, approve_room },
  });
};

// data detail
const getOneRoom = async (id: number) => {
  const res = await instance.get(`/touris/${id}`);
  if (!(res.data.approve_room === Approve.success)) {
    throw new Error("Phòng chưa được duyệt");
  }
  return res;
};

//lấy dữ liệu theo city có status là empty admin  success
const getRoomCity = async (city: string, approve: Approve.success) => {
  return await instance.get("/touris", {
    params: {
      city,
      approve_room: approve,
      booking_status: BookingStatus.empty,
    },
  });
};

const getListRoom = async () => {
  const approve = Approve.success;
  return await instance.get("/touris", {
    params: { approve_room: approve },
  });
};

// addmin cho phép đặt phòng
const patchApprove = async (idRoom: number, approve: ApprovePacth) => {
  return await instance.patch(`/touris/${idRoom}`, approve);
};

// thay đổi BookingStatus pending khi khách đặt phòng
const patchStatusBooking = async (
  idRoom: number,
  statusBooking: PatchBooking
) => {
  return await instance.patch(`/touris/${idRoom}`, statusBooking);
};

// search input city
const searchCityFindRoom = async (city: string) => {
  return await instance.get(`/touris?city_like=${city}`);
};

// summitSearch get city
const getRoomSearchAddress = async (dataSearch: {
  address: string;
  checkin: number;
  checkout: number;
  person: string;
}) => {
  try {
    const res = await instance.get(`/touris/`, {
      params: {
        address_like: dataSearch.address,
        cout_people_gte: dataSearch.person,
        approve_room: Approve.success,
      },
    });
    const result: typeGetRoom[] = res.data.filter((room: IRoomPost) => {
      console.log(!(dataSearch.checkin >= room.start_date));
      console.log(!(dataSearch.checkout <= room.end_date));

      return !(
        dataSearch.checkin >= room.start_date &&
        dataSearch.checkout <= room.end_date
      );
    });
    return result;
  } catch (error) {
    throw new Error("Lỗi không lấy được room");
  }
};

const checkRoomDate = async (booking: IBookingData) => {
  try {
    const res = await instance.get("/touris/" + booking.id_touris);
    const room = res.data;
    if (
      booking.start_date == room.start_date ||
      booking.end_date == room.end_date
    ) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error("Không tìm thấy phòng!");
  }
};

const sortListRoom = async (sort: string, order: string) => {
  const approve = Approve.success;
  return await instance.get("/touris/", {
    params: { _sort: sort, _order: order, approve_room: approve },
  });
};
const roomPayment = async (idRoom: number) => {
  return await instance.patch(`/touris/${idRoom}`, {
    booking_status: BookingStatus.empty,
  });
};

export {
  createRoom,
  getAllRoom,
  patchApprove,
  getRoomCity,
  getOneRoom,
  patchStatusBooking,
  getAllRoomApprove,
  getAllRoomHost,
  getAllRoomApproveHost,
  searchCityFindRoom,
  getRoomSearchAddress,
  checkRoomDate,
  getListRoom,
  sortListRoom,
  roomPayment,
  getAllRoomHostNav,
};
