import { ITaps } from "../type";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BookIcon from "@mui/icons-material/Book";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import GroupIcon from "@mui/icons-material/Group";

const tapUserBooking: ITaps[] = [
  {
    id: 1,
    value: 0,
    label: "Tất cả",
    to: { pathname: "/user", search: "?type=0" },
  },
  {
    id: 2,
    value: 1,
    label: "Chờ xác nhận",
    to: { pathname: "/user", search: "?type=1" },
  },
  {
    id: 3,
    value: 2,
    label: "Đã xác nhận",
    to: { pathname: "/user", search: "?type=2" },
  },
  {
    id: 4,
    value: 3,
    label: "Hoàn thành chuyến",
    to: { pathname: "/user", search: "?type=3" },
  },
  {
    id: 5,
    value: 4,
    label: "Hủy chuyến",
    to: { pathname: "/user", search: "?type=4" },
  },
];
const tapUserBookingAdmin: ITaps[] = [
  {
    id: 1,
    value: 0,
    label: "Tất cả",
    to: { pathname: "/admin/user", search: "?user=0" },
  },
  {
    id: 2,
    value: 1,
    label: "Chờ xác nhận",
    to: { pathname: "/admin/user", search: "?user=1" },
  },
  {
    id: 3,
    value: 2,
    label: "Đã xác nhận",
    to: { pathname: "/admin/user", search: "?user=2" },
  },
  {
    id: 4,
    value: 3,
    label: "Hoàn thành chuyến",
    to: { pathname: "/admin/user", search: "?user=3" },
  },
  {
    id: 5,
    value: 4,
    label: "Hủy chuyến",
    to: { pathname: "/admin/user", search: "?user=4" },
  },
];
const tapHostBooking: ITaps[] = [
  {
    id: 1,
    value: 0,
    label: "Tất cả",
    to: { pathname: "/host/booking", search: "?booking=0" },
  },
  {
    id: 2,
    value: 1,
    label: "Chờ xác nhận",
    to: { pathname: "/host/booking", search: "?booking=1" },
  },
  {
    id: 3,
    value: 2,
    label: "Đã xác nhận",
    to: { pathname: "/host/booking", search: "?booking=2" },
  },
  {
    id: 4,
    value: 3,
    label: "Hoàn thành chuyến",
    to: { pathname: "/host/booking", search: "?booking=3" },
  },
  {
    id: 5,
    value: 4,
    label: "Muốn hủy chuyến",
    to: { pathname: "/host/booking", search: "?booking=4" },
  },
  {
    id: 6,
    value: 5,
    label: "Hủy chuyến",
    to: { pathname: "/host/booking", search: "?booking=5" },
  },
];
const tapAdminRoom: ITaps[] = [
  {
    id: 1,
    value: 0,
    label: "Tất cả",
    to: { pathname: "/admin/room", search: "?approve=0" },
  },
  {
    id: 2,
    value: 1,
    label: "Chờ duyệt",
    to: { pathname: "/admin/room", search: "?approve=1" },
  },
  {
    id: 3,
    value: 2,
    label: "Đã duyệt",
    to: { pathname: "/admin/room", search: "?approve=2" },
  },
  {
    id: 4,
    value: 3,
    label: "Không được duyệt",
    to: { pathname: "/admin/room", search: "?approve=3" },
  },
];

const tapsHostRoom = [
  {
    id: 1,
    value: 0,
    label: "Tất cả",
    to: { pathname: "/host", search: "?approve=0" },
  },
  {
    id: 2,
    value: 1,
    label: "Chờ duyệt",
    to: { pathname: "/host", search: "?approve=1" },
  },
  {
    id: 3,
    value: 2,
    label: "Đã duyệt",
    to: { pathname: "/host", search: "?approve=2" },
  },
  {
    id: 4,
    value: 3,
    label: "Không được duyệt",
    to: { pathname: "/host", search: "?approve=3" },
  },
];

const pathHost = [
  {
    id: 1,
    path: "/host",
    icon: <DashboardIcon />,
    title: "Danh sách phòng",
    chilrend: true,
  },
  { id: 2, path: "/host/postroom", icon: <AddHomeIcon />, title: "Thêm phòng" },
  {
    id: 3,
    path: "/host/user",
    icon: <GroupIcon />,
    title: "Danh sách người dùng",
  },
  {
    id: 4,
    path: "/host/booking",
    icon: <BookIcon />,
    title: "thông kê đơn hàng",
  },
];

const pathAdmin = [
  {
    id: 1,
    path: "/admin",
    icon: <AdminPanelSettingsIcon />,
    title: "Thống kê dữ liệu",
  },
  {
    id: 3,
    path: "/admin/room",
    icon: <MapsHomeWorkIcon />,
    title: "Thống kê khách sạn",
  },
  {
    id: 2,
    path: "/admin/user",
    icon: <GroupIcon />,
    title: "Thống kê khách hàng",
  },
  {
    id: 4,
    path: "/admin/bookingmanager",
    icon: <BookIcon />,
    title: "Thống kê đơn hàng",
  },
];

export {
  pathHost,
  pathAdmin,
  tapUserBooking,
  tapHostBooking,
  tapAdminRoom,
  tapUserBookingAdmin,
  tapsHostRoom,
};
