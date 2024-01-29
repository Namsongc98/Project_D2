import { instance, instance_token } from "../config";
import {
  Approve,
  ApprovePacth,
  ApproveType,
  BookingStatus,
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
  status: BookingStatus.emtry,
  approve: Approve.success
) => {
  return await instance.get("/touris", {
    params: { city, booking_status: status, approve_room: approve },
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

// thay đổi booking statuss succes

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
};
