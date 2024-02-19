import { Bookingmanager, GuideManager, RoomType, UserBooking } from "../page/admin";
import AdminStatistics from "../page/admin/AdminStatistics";
import Roomtype from "../page/admin/RoomType";

import {
  BookingHostStatus,
  BookingUser,
  CalendarHost,
  DepositBooking,
  PostRoom,
  RoomHost,
} from "../page/host";
import {
  DetailRoom,
  HistoryBooking,
  Home,
  ListStay,
  ListStayCity,
  Login,
  Profile,
  Register,
} from "../page/user";
import DetaiSearchRoom from "../page/user/DetaiSearchRoom";

import { Layout, Role } from "../type";

//  laout user
const publicPage: Layout = [
  { id: 1, path: "/", component: Home, layout: true },
  { id: 6, path: "/register", component: Register, layout: false },
  { id: 7, path: "/login", component: Login, layout: false },
  { id: 2, path: ":id", component: DetailRoom, layout: true, childrenRole: "detail", },
  { id: 5, path: ":id", component: ListStayCity, layout: true, childrenRole: "city", },
  { id: 22, path: "search", component: DetaiSearchRoom, layout: true, childrenRole: "city" },
  { id: 4, path: "", component: ListStay, layout: true, childrenRole: "city", },
  // layout User
  {
    id: 8,
    path: "",
    component: HistoryBooking,
    layout: true,
    role: Role.guide,
    childrenRole: "user"
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
    id: 23,
    path: ":id",
    component: Roomtype,
    layout: true,
    role: Role.admin,
    children: true,
    childrenRole: "host"
  },

  {
    id: 11,
    path: "/admin/user",
    component: GuideManager,
    layout: true,
    role: Role.admin,
    children: false,
  },
  {
    id: 20,
    path: "/admin/bookingmanager",
    component: Bookingmanager,
    layout: true,
    role: Role.admin,
    children: false,
  },
  {
    id: 18,
    path: "",
    component: UserBooking,
    layout: true,
    role: Role.admin,
    children: true,
    childrenRole: "user",
  },
  {
    id: 17,
    path: "",
    component: RoomType,
    layout: false,
    role: Role.admin,
    children: true,
    childrenRole: "room",
  },
  // layout Host
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
    path: "/host/user",
    component: DepositBooking,
    layout: true,
    role: Role.host,
    children: false,
  },
  {
    id: 21,
    path: "",
    component: BookingUser,
    layout: true,
    role: Role.host,
    children: false,
    childrenRole: "user",
  },
  {
    id: 16,
    path: "",
    component: BookingHostStatus,
    layout: true,
    role: Role.host,
    children: true,
    childrenRole: "booking",
  },
  {
    id: 19,
    path: "",
    component: RoomHost,
    layout: true,
    role: Role.host,
    children: true,
    childrenRole: "room",
  },
  {
    id: 23,
    path: "/host/calendar",
    component: CalendarHost,
    layout: true,
    role: Role.host,
    children: true,
  },
];
// layout login register

export { publicPage };
