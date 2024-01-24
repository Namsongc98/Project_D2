import { GuideManager, HostManager } from "../page/admin";
import AdminStatistics from "../page/admin/AdminStatistics";
import { DepositBooking, PostRoom } from "../page/host";
import HostStatistics from "../page/host/HostStatistics";
import { Home, ListStay, Login, Register, SearchHotel, User } from "../page/user";
import Detail from "../page/user/Detail";
import DetailRoom from "../page/user/DetailRoom";
import Profile from "../page/user/Profile";
import { Layout, Role } from "../type";

//  laout user
const publicPage: Layout = [
  { path: "/", component: Home, layout: true },
  { path: "/search", component: SearchHotel, layout: true },
  { path: "/detail", component: Detail, layout: true },
  { path: "/detail/:id", component: DetailRoom, layout: true },
  { path: "/:id", component: ListStay, layout: true },
  // lyout User
  { path: "/user", component: User, layout: true, role: Role.guide },
  { path: "/user/profile", component: Profile, layout: true, role: Role.guide },
  // layout Admin
  { path: "/admin", component: AdminStatistics, layout: true, role: Role.admin },
  { path: "/admin/guidemanager", component: GuideManager, layout: true, role: Role.admin },
  { path: "/admin/hostmanager", component: HostManager, layout: true, role: Role.admin },
  // layout Host
  { path: "/host", component: HostStatistics, layout: true, role: Role.host },
  { path: "/host/postroom", component: PostRoom, layout: true, role: Role.host },
  { path: "/host/depositbooking", component: DepositBooking, layout: true, role: Role.host },
];
// layout login register
const member = [
  { path: "/register", component: Register, layout: true },
  { path: "/login", component: Login, layout: true },
];

export { publicPage, member };
