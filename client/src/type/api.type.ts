import { IProfileUser } from "."

type Decode = {
    email: string,
    exp: number,
    iat: number,
    sub: string,
}
type GetUserApi = {
    data: IProfileUser[]
}

type StatusApi = {
    type: string,
    message: string
}
export type { Decode, GetUserApi,StatusApi }