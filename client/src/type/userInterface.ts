enum Role {
  admin = "Admin",
  guide = "Guide",
  host = "Host",
}

interface IUser {
  id?: string;
  email: string;
  password: string;
  role?: Role;
}

interface IProfile {
  firstName?: string;
  lastName?: string;
  avatar?: string | File;
  phone?: string;
  gender?: string;
  role?: Role;
  email?: string;
  age?: string;
  password?: string;
}

interface IProfileUser {
  id: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  gender?: string;
  role?: Role;
  email: string;
  age?: string;
  password?: string;
  [key: string]: any
}



export { Role, };
export type { IProfile, IProfileUser, IUser }
