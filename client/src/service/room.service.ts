
import { instance, instance_token } from "../config";
import {
  Approve,
  ApprovePacth,
  ApproveType,
  IRoomPost,
  PatchBooking,
} from "../type";

// tạo phòng
const createRoom = async (room: IRoomPost) => {
  return await instance_token.post("/touris", room);
};

// data tất cả phòng
const getAllRoom = async (page: number, limit: number) => {
  return await instance.get(`/touris?_page=${page}&_limit=${limit}`);
};
const getAllRoomHost = async (page: number, limit: number, host_id: string) => {
  return await instance.get(`/touris?_page=${page}&_limit=${limit}`, {
    params: { host_id },
  });
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
  return await instance.get(`/touris/${id}`);
};

//lấy dữ liệu theo city có status là emtry admin  success
const getRoomCity = async (
  city: string,
  approve: Approve.success
) => {
  return await instance.get("/touris", {
    params: { city, approve_room: approve },
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
const getRoomSearchAddress = async (dataSearch: { address: string, checkin: string, checkout: string, person: string }) => {
  const res = await instance.get(`/touris/`, { params: { address_like: dataSearch.address, cout_people_gte: dataSearch.person, start_date_lte: dataSearch.checkin, end_date_lte: dataSearch.checkin } })
  return res
}

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
  getRoomSearchAddress
};
