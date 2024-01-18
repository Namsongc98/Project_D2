

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
type Approve = "Pending" | "Fail" | "Success"

enum BookingStatus {
    pending = "Pending",
    success = "Success",
    emtry = "Empty"
}

interface IRoomPost {
    host_id: string | undefined;
    booking_status: BookingStatus
    approve_room: Approve
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
    image: any[],
}

type ApprovePacth = {
    approve_room: Approve
}

export type { IRoomSubmit, IRoomPost, Approve, ApprovePacth }
export { BookingStatus }