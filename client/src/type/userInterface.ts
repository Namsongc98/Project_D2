enum role {
    admin = "Admin",
    guide = "Guide",
    hosh = "Host"
}

interface IUser {
    id?: string
    email: string
    password: string
    role?: role
}

interface IUser {
    email: string
    password: string
}

interface IProfile extends IUser {
    image: string
    firstName: string
    lastName: string
}

export type { IUser, role, IProfile }