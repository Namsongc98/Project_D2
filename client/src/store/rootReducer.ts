
import { combineReducers } from '@reduxjs/toolkit'
import UserSlice from './reducer/userSlice.ts'

const rootReducer = combineReducers({
    UserSlice
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>