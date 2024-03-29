import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { setUser } = UserSlice.actions
export const getUser = (state: any) => state?.UserSlice?.user
export default UserSlice.reducer;