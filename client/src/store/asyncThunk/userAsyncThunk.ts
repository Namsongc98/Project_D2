import { createAsyncThunk } from "@reduxjs/toolkit";

import { getLocalToken } from "../../common/localStogate";

import { getUserSevice } from "../../service";
import { Decode } from "../../type";
import { jwtDecode } from "jwt-decode";

const token: string | null = getLocalToken();
let decodedToken: Decode
if (token) {
    decodedToken = jwtDecode(token);
} 

const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async () => {
        try {
            const res = getUserSevice(decodedToken?.email)
            return res
        } catch (error: any) {
            throw new Error(error)
        }
    }
)

export { fetchUser }