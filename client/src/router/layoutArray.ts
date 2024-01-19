import { GuideManager, HostManager } from "../page/admin";
import AdminStatistics from "../page/admin/AdminStatistics";
import { PostRoom } from "../page/host";
import HostStatistics from "../page/host/HostStatistics";
import { Home, ListStay, Login, Register, SearchHotel } from "../page/user";
import Profile from "../page/user/Profile";
import { Layout } from "../type";

//  laout user
const publicPage: Layout = [
  { path: "/", component: Home, layout: true },
  { path: "/search", component: SearchHotel, layout: true },
  { path: "/profile", component: Profile, layout: true },
  { path: "/:id", component: ListStay, layout: true },
];

// layout Admin
const privateAmin: Layout = [
  { path: "/admin", component: AdminStatistics, layout: true },
  { path: "/guidemanager", component: GuideManager, layout: true },
  { path: "/hostmanager", component: HostManager, layout: true },
];

const layoutHost: Layout = [
  { path: "/host", component: HostStatistics, layout: true },
  { path: "/host/postroom", component: PostRoom, layout: true },
];

// layout login register
const member = [
  { path: "/register", component: Register, layout: true },
  { path: "/login", component: Login, layout: true },
];

export { publicPage, privateAmin, member, layoutHost };
