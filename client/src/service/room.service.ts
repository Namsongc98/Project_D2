import { instance, instance_token } from "../config";
import {  IRoomPost } from "../type";


const createRoom = async (room: IRoomPost) => {
    console.log(room)
    const result = await instance_token.post("/touris", room);
    return result;
};

export { createRoom }