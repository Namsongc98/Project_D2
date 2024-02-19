
import { combineReducers } from '@reduxjs/toolkit'
import UserSlice from './reducer/userSlice.ts'
import BookingSlice from './reducer/bookingSlice.ts'

const rootReducer = combineReducers({
    UserSlice,
    BookingSlice
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>