type Props = {
    children: React.ReactNode;
};

enum role {
    admin = "Admin",
    guide = "guide",
    hosh = "hosh"
}

interface IUser {
    name?: string
    email: string
    password: string
    role?: role
    firstName?: string
    lastName?: string
    token?: string
    refreshToken?: string
}

export type { Props, IUser } 