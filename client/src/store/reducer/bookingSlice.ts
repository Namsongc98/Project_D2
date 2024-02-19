import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    booking: {}
}
const BookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingParam: (state, action) => {
            state.booking = action.payload
        }
    }
})
export const { setBookingParam } = BookingSlice.actions
export const getBookingParam = (state: any) => state.BookingSlice.booking
export default BookingSlice.reducer