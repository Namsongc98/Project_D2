import { GuideManager, HostManager } from "../page/admin";
import AdminStatistics from "../page/admin/AdminStatistics";
import { DepositBooking, PostRoom } from "../page/host";
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
  { id: 14, path: "/register", component: Register, layout: false },
  { id: 15, path: "/login", component: Login, layout: false },
  // lyout User
  { id: 6, path: "type", component: HistoryBooking, layout: true, role: Role.guide, children: true },
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
    path: "/admin/guidemanager",
    component: GuideManager,
    layout: true,
    role: Role.admin,
  },
  {
    id: 10,
    path: "/admin/hostmanager",
    component: HostManager,
    layout: true,
    role: Role.admin,
  },
  // layout Host
  {
    id: 11,
    path: "/host",
    component: HostStatistics,
    layout: true,
    role: Role.host,
  },
  {
    id: 12,
    path: "/host/postroom",
    component: PostRoom,
    layout: true,
    role: Role.host,
  },
  {
    id: 13,
    path: "/host/depositbooking",
    component: DepositBooking,
    layout: true,
    role: Role.host,
  },
];
// layout login register


export { publicPage };
