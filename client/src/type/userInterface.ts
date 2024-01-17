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

interface IRoomSubmit {
  id?: number;
  nameHotel: string;
  city: string;
  address: string;
  price: number;
  typeTouris: string;
  bedRoom: number;
  bathRoom: number;
  decription: string;
  coutPeople: number;

}
interface IRoomPost {
  user_id: string | undefined;
  approve_room?: boolean
  created_at: number
  name: string,
  address: string,
  price: number,
  cout_people: number,
  city: string,
  type_tourism: string,
  bedroom: number,
  bathroom: number,
  decription: string,
  imge: any[],
}

export type { IUser, Role, IProfile, IProfileUser, IRoomSubmit, IRoomPost };
