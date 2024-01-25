import DashboardIcon from "@mui/icons-material/Dashboard";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import GroupIcon from "@mui/icons-material/Group";
import { ColumnTable, TableRoom } from "../type";
import { convertDateToTimestamp, formatcurrency } from "../common";

const dataCityCarousel = [
  {
    id: 1,
    city: "Thành phỗ Hà Nội",
    search: "Hà Nội",
    img: "https://cdn.asahiluxstay.com//uploads/medium/media/2022/0506/0239-e0f2d20657fbf7e-gioi-thieu-doi-net-ve-ho-hoan-kiem-ho-guom-o-ha-noi-3-2.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA1MDYvMDIzOS1lMGYyZDIwNjU3ZmJmN2UtZ2lvaS10aGlldS1kb2ktbmV0LXZlLWhvLWhvYW4ta2llbS1oby1ndW9tLW8taGEtbm9pLTMtMi5qcGc=",
  },
  {
    id: 2,
    city: "Thành phỗ Hồ Chí Minh",
    search: "Hồ Chí Minh",
    img: "https://cdn.asahiluxstay.com//uploads/medium/media/2022/0405/0453-915b7014e87be83-ben-thanh-market-2.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA0MDUvMDQ1My05MTViNzAxNGU4N2JlODMtYmVuLXRoYW5oLW1hcmtldC0yLmpwZw==",
  },
  {
    id: 3,
    city: "Thành phỗ Đà Nẵng",
    search: "Đà Nẵng",
    img: "https://cdn.asahiluxstay.com//uploads/medium/media/2021/1222/0937-9c3046ca53d5fe5-7-du-1634353732500.jpg?s=aHR0cHM6Ly9jZG4uZHhtYi52bi9tZWRpYS8yMDIxLzEyMjIvMDkzNy05YzMwNDZjYTUzZDVmZTUtNy1kdS0xNjM0MzUzNzMyNTAwLmpwZw==",
  },
  {
    id: 4,
    city: "Thành phỗ Lào Cai",
    search: "Lào Cai",
    img: "https://cdn.asahiluxstay.com//uploads/medium/media/2022/0506/0232-670fec15668554a-di-sapa-can-chuan-bi-nhung-gi-de-chuyen-di-duoc-tr-10-760x367.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA1MDYvMDIzMi02NzBmZWMxNTY2ODU1NGEtZGktc2FwYS1jYW4tY2h1YW4tYmktbmh1bmctZ2ktZGUtY2h1eWVuLWRpLWR1b2MtdHItMTAtNzYweDM2Ny5qcGc=",
  },
  {
    id: 5,
    city: "Thành phỗ Quảng Ninh",
    search: "Quảng Ninh",
    img: "https://cdn.asahiluxstay.com//uploads/medium/media/2022/0506/0236-3ca4f4f8e2fb70c-vinh-16240967369661608835259.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA1MDYvMDIzNi0zY2E0ZjRmOGUyZmI3MGMtdmluaC0xNjI0MDk2NzM2OTY2MTYwODgzNTI1OS5qcGc=",
  },
  {
    id: 6,
    city: "Thành phỗ Ninh Bình",
    search: "Ninh Bình",
    img: "https://cdn.asahiluxstay.com//uploads/medium/media/2022/0506/0240-18584cb54c029fb-anh-tam-coc-bich-dong-ninh-binh.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA1MDYvMDI0MC0xODU4NGNiNTRjMDI5ZmItYW5oLXRhbS1jb2MtYmljaC1kb25nLW5pbmgtYmluaC5qcGc=",
  },
];

const specialOffer = [
  {
    id: 1,
    image:
      "https://cdn.asahiluxstay.com//uploads/small/media/2023/0408/0351-viber-image-2023-04-07-15-34-00-548.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIzLzA0MDgvMDM1MS12aWJlci1pbWFnZS0yMDIzLTA0LTA3LTE1LTM0LTAwLTU0OC5qcGc=",
  },
  {
    id: 2,
    image:
      "https://cdn.asahiluxstay.com//uploads/small/media/2023/0208/0907-viber-image-2023-02-03-13-35-00-744.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIzLzAyMDgvMDkwNy12aWJlci1pbWFnZS0yMDIzLTAyLTAzLTEzLTM1LTAwLTc0NC5qcGc=",
  },
  {
    id: 3,
    image:
      "https://cdn.asahiluxstay.com//uploads/small/media/2023/0208/0758-viber-image-2023-02-07-11-02-55-622.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIzLzAyMDgvMDc1OC12aWJlci1pbWFnZS0yMDIzLTAyLTA3LTExLTAyLTU1LTYyMi5qcGc=",
  },
];

const typeTouris = [
  {
    id: 1,
    image: "https://asahiluxstay.com/v2/images/resource/canhodichvu.jpg?v=1",
    type: "Căn hộ dịch vụ",
  },
  {
    id: 2,
    image: "https://asahiluxstay.com/v2/images/resource/bietthu.jpg?v=1",
    type: "Biệt thự",
  },
  {
    id: 3,
    image:
      "https://cdn.asahiluxstay.com//uploads/small/uploads/small/media/2022/0323/1038-c127f06348f8d36-269968090-640466063963335-7765074015202759049-n.jpg?s=aHR0cHM6Ly9jZG4uZHhtYi52bi91cGxvYWRzL3NtYWxsL21lZGlhLzIwMjIvMDMyMy8xMDM4LWMxMjdmMDYzNDhmOGQzNi0yNjk5NjgwOTAtNjQwNDY2MDYzOTYzMzM1LTc3NjUwNzQwMTUyMDI3NTkwNDktbi5qcGc/cz1hSFIwY0hNNkx5OWpaRzR1WkhodFlpNTJiaTl0WldScFlTOHlNREl5THpBek1qTXZNVEF6T0Mxak1USTNaakEyTXpRNFpqaGtNell0TWpZNU9UWTRNRGt3TFRZME1EUTJOakEyTXprMk16TXpOUzAzTnpZMU1EYzBNREUxTWpBeU56VTVNRFE1TFc0dWFuQm4=",
    type: "HomeStay",
  },
  {
    id: 4,
    image:
      "https://cdn.asahiluxstay.com//uploads/small/uploads/small/media/2022/0418/0925-d6efd23f3d2319a-297794682.jpg?s=aHR0cHM6Ly9jZG4uZHhtYi52bi91cGxvYWRzL3NtYWxsL21lZGlhLzIwMjIvMDQxOC8wOTI1LWQ2ZWZkMjNmM2QyMzE5YS0yOTc3OTQ2ODIuanBnP3M9YUhSMGNITTZMeTlqWkc0dVlYTmhhR2xzZFhoemRHRjVMbU52YlM5dFpXUnBZUzh5TURJeUx6QTBNVGd2TURreU5TMWtObVZtWkRJelpqTmtNak14T1dFdE1qazNOemswTmpneUxtcHdadz09",
    type: "Khách sạn",
  },
];

const pathHost = [
  { id: 1, path: "/host", icon: <DashboardIcon />, title: "Danh sách phòng" },
  { id: 2, path: "/host/postroom", icon: <AddHomeIcon />, title: "Thêm phòng" },
  {
    id: 3,
    path: "/host/depositbooking",
    icon: <AddHomeIcon />,
    title: "Danh sách người dùng",
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
    path: "/admin/hostmanager",
    icon: <MapsHomeWorkIcon />,
    title: "Thống kê khách sạn",
  },
  {
    id: 2,
    path: "/admin/guidemanager",
    icon: <GroupIcon />,
    title: "Thống kê khách hàng",
  },
];

const columnsTable: readonly ColumnTable[] = [
  { id: "id", label: "Id", minWidth: 20 },
  { id: "name", label: "Tên Khách sạn", minWidth: 100 },
  { id: "type_tourism", label: "kiểu dịch vụ", minWidth: 120 },
  { id: "city", label: "Thành phố", minWidth: 100 },
  { id: "price", label: "Giá phòng", minWidth: 100 },
];

const columnBooking: TableRoom[] = [
  { index: "id", label: "id", minWidth: 20, align: "left" },
  { index: "name_user", label: "Name", minWidth: 150, align: "left" },
  { index: "email", label: "Email", minWidth: 100, align: "left" },
  { index: "phone", label: "Số điện thoại", minWidth: 150, align: "left" },
  { index: "name_room", label: "Tên phòng", minWidth: 200, align: "left" },
  {
    index: "start_date",
    label: "Ngày đặt",
    minWidth: 50,
    align: "left",
    format: (value) => convertDateToTimestamp(value),
  },
  {
    index: "end_date",
    label: "Ngày cuối",
    minWidth: 50,
    align: "left",
    format: (value) => convertDateToTimestamp(value),
  },
  { index: "cout_persion", label: "Số người", minWidth: 100, align: "left" },
  {
    index: "total",
    label: "Giá tiền",
    minWidth: 80,
    align: "left",
    format: (value) => formatcurrency(value),
  },
  { index: "pay_status", label: "Thanh toán", minWidth: 110, align: "left" },
];

const columnUser: TableRoom[] = [
  { index: "gender", label: "Giới tình", minWidth: 30, align: "left" },
  { index: "age", label: "Tuổi", minWidth: 30, align: "left" },
  {
    index: "phone",
    label: "Số điện thoại",
    minWidth: 30,
    align: "left",
  },
];

const tapUserBooking = [
  { id: 1, value: 0, label: "Tất cả", to: "?type=0" },
  { id: 2, value: 1, label: "Chờ xác nhận", to: "?type=1" },
  { id: 3, value: 2, label: "Đã xác nhận", to: "?type=2" },
  { id: 4, value: 3, label: "Hoàn thành chuyến", to: "?type=3" },
  { id: 5, value: 4, label: "Hủy chuyến", to: "?type=4" },
];

export {
  dataCityCarousel,
  specialOffer,
  typeTouris,
  pathHost,
  pathAdmin,
  columnsTable,
  columnBooking,
  columnUser,
  tapUserBooking,
};
