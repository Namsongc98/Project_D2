import { AxiosError } from "axios";
import { instance, instance_token } from "../config";
import { IProfile, IUser, Role } from "../type";


//  regisster 
const createUser = async (user: IUser) => {
  const result = await instance.post("/users", user);
  return result;
};

// login 
const loginUser = async (user: IUser) => {
  const result = await instance.post("/login", user);
  return result;
};

// lấy user theo email
const getUserSevice = async (email: string) => {
  try {
    const res = await instance.get(`/users`, { params: { email } });
    return res;
  } catch (error: unknown) {
    if (error instanceof AxiosError)
      throw new Error(error.message)
  }
};

// thêm data profile
const postProfile = async (id: string, profile: IProfile) => {
  const res = await instance_token.patch(`/users/${id}`, profile);
  return res;
};

const getAllHost = async () => {
  const res = await instance.get('/users/', { params: { role: Role.host } })
  return res
}

const getAllUser = async () => {
  return await instance.get('/users/', { params: { role: Role.guide } })
}

const getUserHostId = async (idUser: string) => {
  try {
    const res = await instance.get('users/' + idUser)
    return res.data
  } catch (error) {
    throw new Error("user Invalid")
  }
}



export { createUser, loginUser, postProfile, getUserSevice, getAllUser, getAllHost, getUserHostId };
