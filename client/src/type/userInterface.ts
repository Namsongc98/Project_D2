enum Role {
  admin = "Admin",
  guide = "Guide",
  hosh = "Host",
}

interface IUser {
  id?: string;
  email: string;
  password: string;
  role?: "Admin" | "Guide" | "Host";
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
}

interface IRoom {
  id?: number;
  nameHotel: string;
  city: string;
  address: string;
  price: number;
  typeTouris: string;
  bedRoom: number;
  bathRoom: number;
  decription: string;
}

export type { IUser, Role, IProfile, IProfileUser, IRoom };
