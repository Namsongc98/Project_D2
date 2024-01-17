import { instance, instance_token } from "../config";
import { IRoomPost } from "../type";


const createRoom = async (room: IRoomPost) => {
    return await instance_token.post("/touris", room);
};

const getAllRoom = async () => {
    return await instance.get("/touris");
};

export { createRoom, getAllRoom }