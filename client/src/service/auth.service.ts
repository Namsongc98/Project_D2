import { axiosPublic } from "../config";
import { IProfile, IUser } from "../type";


const createUser = async (user: IUser) => {
    const result = await axiosPublic.post("/users", user);
    return result
}

const loginUser = async (user: IUser) => {
    const result = await axiosPublic.post("/login", user);
    return result
}

const getUserSevice = async (email: string) => {
    const res = await axiosPublic.get(`/users/`, { params: { email } })
    return res
}

const postProfile = async (id: string, profile: IProfile) => {
    const res = await axiosPublic.patch(`/users/${id}`, profile)
    return res
}

export { createUser, loginUser, postProfile, getUserSevice }