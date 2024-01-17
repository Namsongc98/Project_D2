import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../asyncThunk/userAsyncThunk";


const initialState = {
    user: {},

}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
    },
})

export const { setUser } = UserSlice.actions
export const getUser = (state: any) => state?.UserSlice?.user
export default UserSlice.reducer;