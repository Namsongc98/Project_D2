import { UserManager } from "../page/admin"
import { Home, Login, Register, SearchHotel } from "../page/user"
import Profile from "../page/user/Profile"
import { Layout } from "../type"

//  laout user 
const publicPage: Layout = [
    { path: "/", component: Home, layout: true },
    { path: "/search", component: SearchHotel, layout: true },
    { path: "/profile", component: Profile, layout: true }
]

// layout Admin
const privateAmin: Layout = [
    { path: "/user", component: UserManager, layout: true }
]

// layout login register
const member = [
    { path: "/register", component: Register, layout: true },
    { path: "/login", component: Login, layout: true },

]

export { publicPage, privateAmin, member }