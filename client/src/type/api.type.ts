
import { Approve, IProfileUser, ImageFiles } from "."

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

type typeGetRoom = {
    id: number,
    address: string,
    host_id: string,
    city: string
    approve_room: Approve,
    bathroom: number
    bedroom: number
    cout_people: number
    created_at: number | string
    decription: string
    image: ImageFiles[]
    name: string
    price: number
    type_tourism: string
    user_id?: string
    [key: string]: any
}
export type { Decode, GetUserApi, StatusApi, typeGetRoom }