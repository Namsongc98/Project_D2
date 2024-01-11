import { jwtDecode } from "jwt-decode";
import { getLocalToken } from "../common/localStogate";
import { getUserSevice } from "../service";
import { Decode, GetUserApi, IProfileUser } from "../type";
import { useEffect, useState } from "react";



const useGetUser = () => {
    const [user, setUser] = useState<IProfileUser>();
    const token = getLocalToken();
    const decodedToken: Decode = jwtDecode(token);
    useEffect(() => {
        const getUser = async () => {
            try {
                const getUser: GetUserApi = await getUserSevice(decodedToken.email);
                setUser(getUser?.data[0]);
            } catch (error: unknown) {
                if (typeof error === "string") throw new Error(error);
            }
        };
        getUser();
    }, []);

    return user
}

export default useGetUser 