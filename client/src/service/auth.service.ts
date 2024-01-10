import { axiosPublic } from "../config";
import { IUser } from "../type";


const createUser = async (user: IUser) => {
    const result = await axiosPublic.post("/users", user);
    return result
}

const loginUser = async (user: IUser) => {
    const result = await axiosPublic.post("/login", user);
    return result
}

export {  createUser, loginUser }