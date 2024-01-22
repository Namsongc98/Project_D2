import { instance, instance_token } from "../config";
import { IProfile, IUser } from "../type";


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
  const res = await instance.get(`/users`, { params: { email } });
  return res;
};

// thêm data profile
const postProfile = async (id: string, profile: IProfile) => {
  const res = await instance_token.patch(`/users/${id}`, profile);
  return res;
};

export { createUser, loginUser, postProfile, getUserSevice };
