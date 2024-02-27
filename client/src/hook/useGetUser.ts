import { jwtDecode } from "jwt-decode";
import { getLocalToken } from "../common/localStogate";
import { getUserSevice } from "../service";
import { Decode, IProfileUser } from "../type";
import { useEffect, useState } from "react";
const useGetUser = () => {
    const [user, setUser] = useState<IProfileUser | null>();
    const token = getLocalToken();
    useEffect(() => {
        if (!token) return
        const decodedToken: Decode = jwtDecode(token);
        const getUser = async () => {
            try {
                const getUser = await getUserSevice(decodedToken.email);
                setUser(getUser?.data[0]);
            } catch (error: unknown) {
                if (error instanceof Error)
                    throw new Error(error.message);
            }
        };
        getUser();
    }, []);

    return user
}

export default useGetUser 