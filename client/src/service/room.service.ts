import { instance, instance_token } from "../config";
import { ApprovePacth, BookingStatus, IRoomPost } from "../type";


const createRoom = async (room: IRoomPost) => {
    return await instance_token.post("/touris", room);
};

const getAllRoom = async () => {
    return await instance.get("/touris");
};

const getOneRevice = async (id: string,) => {
    return await instance.get(`/touris/${id}`);

}

const getRoomCity = async (city: string, status: BookingStatus.emtry) => {
    return await instance.get("/touris", { params: { city, status } });
};

const patchApprove = async (idRoom: number, approve: ApprovePacth) => {
    return await instance.patch(`/touris/${idRoom}`, approve);
}


export { createRoom, getAllRoom, patchApprove, getRoomCity, getOneRevice }