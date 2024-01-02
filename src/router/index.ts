

import { ReactNode } from "react";
import Home from "../page/user/Home";
import Login from "../page/user/Login";
import Register from "../page/user/Register";
import SearchHotel from "../page/user/SearchHotel";
import { UserManager } from "../page/admin";

type Layout = {
    path: string;
    component: React.FC | (() => JSX.Element | ReactNode);
    layout: boolean;
}[]

const publicPage: Layout = [
    { path: "/", component: Home, layout: true },
    { path: "/login", component: Login, layout: true },
    { path: "/register", component: Register, layout: true },
    { path: "/search", component: SearchHotel, layout: true },
]

const privateAmin: Layout = [
    { path: "/user", component: UserManager, layout: true }
]

export { publicPage, privateAmin }

export {default as PrivateAdmin} from "./PrivateAdmin"