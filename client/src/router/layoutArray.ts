import { GuideManager, HostManager, RoomType } from "../page/admin";
import AdminStatistics from "../page/admin/AdminStatistics";
import { BookingHostStatus, DepositBooking, PostRoom } from "../page/host";
import HostStatistics from "../page/host/HostStatistics";
import {
  Detail,
  DetailRoom,
  HistoryBooking,
  Home,
  ListStay,
  Login,
  Profile,
  Register,
  SearchHotel,
} from "../page/user";

import { Layout, Role } from "../type";

//  laout user
const publicPage: Layout = [
  { id: 1, path: "/", component: Home, layout: true },
  { id: 2, path: "/search", component: SearchHotel, layout: true },
  { id: 3, path: "/detail", component: Detail, layout: true },
  { id: 4, path: "/detail/:id", component: DetailRoom, layout: true },
  { id: 5, path: "/:id", component: ListStay, layout: true },
  { id: 6, path: "/register", component: Register, layout: false },
  { id: 7, path: "/login", component: Login, layout: false },
  // lyout User
  {
    id: 8,
    path: "",
    component: HistoryBooking,
    layout: true,
    role: Role.guide,
    children: true,
  },
  {
    id: 9,
    path: "profile",
    component: Profile,
    layout: true,
    role: Role.guide,
  },
  // layout Admin
  {
    id: 10,
    path: "/admin",
    component: AdminStatistics,
    layout: true,
    role: Role.admin,
    children: false,
  },
  {
    id: 11,
    path: "/admin/guidemanager",
    component: GuideManager,
    layout: true,
    role: Role.admin,
    children: false,
  },
  {
    id: 12,
    path: "/admin/hostmanager",
    component: HostManager,
    layout: true,
    role: Role.admin,
    children: false,
  },
  {
    id: 17,
    path: "",
    component: RoomType,
    layout: false,
    role: Role.admin,
    children: true,
  },
  // layout Host
  {
    id: 13,
    path: "/host",
    component: HostStatistics,
    layout: true,
    role: Role.host,
    children: false,
  },
  {
    id: 14,
    path: "/host/postroom",
    component: PostRoom,
    layout: true,
    role: Role.host,
    children: false,
  },
  {
    id: 15,
    path: "/host/depositbooking",
    component: DepositBooking,
    layout: true,
    role: Role.host,
    children: false,
  },
  {
    id: 16,
    path: "",
    component: BookingHostStatus,
    layout: true,
    role: Role.host,
    children: true,
  },
];
// layout login register

export { publicPage };
