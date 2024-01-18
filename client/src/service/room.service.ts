import { instance, instance_token } from "../config";
import { ApprovePacth, IRoomPost } from "../type";


const createRoom = async (room: IRoomPost) => {
    return await instance_token.post("/touris", room);
};

const getAllRoom = async () => {
    return await instance.get("/touris");
};

const patchApprove = async (idRoom: number, approve: ApprovePacth) => {
    return await instance.patch(`/touris/${idRoom}`, approve);
}


export { createRoom, getAllRoom, patchApprove }