import { Bookingmanager, GuideManager } from "../page/admin";
import AdminStatistics from "../page/admin/AdminStatistics";
import CalendarAdmin from "../page/admin/CalendarAdmin";
import {
  CalendarHost,
  DepositBooking,
  PostRoom,
} from "../page/host";
import {
  Home,
  ListStay,
  ListStayCity,
  Login,
  Profile,
  Register,
} from "../page/user";
import DetaiSearchRoom from "../page/user/DetaiSearchRoom";
import { Layout, Role } from "../type";
const publicPage: Layout = [
  { id: 1, path: "/", component: Home, layout: true },
  { id: 2, path: "/register", component: Register, layout: false },
  { id: 3, path: "/login", component: Login, layout: false },
  { id: 4, path: ":id", component: ListStayCity, layout: true, childrenRole: "city", },
  { id: 5, path: "search", component: DetaiSearchRoom, layout: true, childrenRole: "city" },
  { id: 6, path: "", component: ListStay, layout: true, childrenRole: "city", },
  // layout User
  {
    id: 7,
    path: "profile",
    component: Profile,
    layout: true,
    role: Role.guide,
  },
  // layout Admin
  {
    id: 8,
    path: "/admin",
    component: AdminStatistics,
    layout: true,
    role: Role.admin,
  },
  {
    id: 9,
    path: "/admin/user",
    component: GuideManager,
    layout: true,
    role: Role.admin,
  },
  {
    id: 10,
    path: "/admin/bookingmanager",
    component: Bookingmanager,
    layout: true,
    role: Role.admin,
  },
  {
    id: 14,
    path: "/admin/calendar",
    component: CalendarAdmin,
    layout: true,
    role: Role.admin,
  },
  {
    id: 14,
    path: "/admin/calendar",
    component: CalendarAdmin,
    layout: true,
    role: Role.admin,
  },
  // layout Host
  {
    id: 11,
    path: "/host/postroom",
    component: PostRoom,
    layout: true,
    role: Role.host,
  },
  {
    id: 12,
    path: "/host/user",
    component: DepositBooking,
    layout: true,
    role: Role.host,
  },
  {
    id: 13,
    path: "/host/calendar",
    component: CalendarHost,
    layout: true,
    role: Role.host,
  },

];
// layout login register

export { publicPage };
