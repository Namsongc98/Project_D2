enum role {
  admin = "Admin",
  guide = "Guide",
  hosh = "Host",
}

interface IUser {
  id?: string;
  email: string;
  password: string;
  role?: role;
}

interface IProfile {
  image?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string | File;
  phone?: string;
  gender: string;
  role?: role;
}

export type { IUser, role, IProfile };
