
import { IProfileUser, ImgageFiles } from "."

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
    city: string
    approve_room: boolean,
    bathroom: number
    bedroom: number
    cout_people: number
    created_at: number | string
    decription: string
    image: ImgageFiles[]
    name: string
    price: number
    type_tourism: string
    user_id: string
  
  
  }
export type { Decode, GetUserApi, StatusApi,typeGetRoom }