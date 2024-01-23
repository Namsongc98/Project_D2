import { Link, useNavigate } from "react-router-dom";
import "../../style/styleComponent.scss";
import { useEffect, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import { useGetUser } from "../../hook";
import Popup from "../componentReuse/Popup";
import { convertDateToTimestamp, remoteToken } from "../../common";
import AvatarUser from "../componentReuse/AvatarUser";
import { useSelector } from "react-redux";
import { getUser, setUser } from "../../store/reducer/userSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { getBookingUser, getOneRoom, patchBookingConfirm } from "../../service";
import {
  BookingStatus,
  IBookingData,
  Role,
  StatusPayment,
  typeGetRoom,
} from "../../type";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalComponent } from "../componentReuse";

const Header = () => {
  const userSelector = useSelector(getUser);
  const [bookingArr, setBooking] = useState<IBookingData[] | undefined>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useGetUser();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const [openInfor, setOpenInfor] = useState(false);
  const [inforRoom, setInforRoom] = useState<typeGetRoom>();
  const [inforBooking, setInforBooking] = useState<IBookingData>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    try {
      const res = await getBookingUser(userSelector.id);
      setBooking(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenInfor = async (
    booking: IBookingData | undefined = undefined
  ) => {
    try {
      if (booking?.id_touris) {
        const res = await getOneRoom(booking.id_touris);
        setInforRoom(res.data);
      }
      setInforBooking(booking);
      setOpenInfor(!openInfor);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (idBooking: number) => {
    const bookingStatus = {
      booking_status: BookingStatus.pending,
    };
    try {
      const res = patchBookingConfirm(idBooking, bookingStatus);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  const handleLogout = () => {
    remoteToken();
    navigate("/login");
  };

  return (
    <header className=" bg-white w-full h-16 shadow-md">
      <div className="  my-0 mx-auto max-w-[1024px] flex items-center justify-between h-full">
        <div className=""></div>
        <div className="flex gap-2 items-center h-full">
          <Link
            to="/"
            className="flex gap-2 items-center hover:bg-[#e0ecff] px-3 py-2 rounded-md text-base text-[#00afdd]"
          >
            <HomeIcon className="text-[#00afdd]" />
            <p>Trang chủ</p>
          </Link>
          {userSelector && (
            <div className="">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickMenu}
                sx={{ color: "#00afdd" }}
                startIcon={<BookIcon />}
              >
                Đơn đặt
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: -100,
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {bookingArr && bookingArr.length > 0 ? (
                  bookingArr?.map((booking) => (
                    <MenuItem
                      sx={{ px: "10px", minWidth: "300px" }}
                      key={booking.id}
                      onClick={() => handleOpenInfor(booking)}
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div className="">
                            <span>{booking.name_room}</span>
                            <p className="text-xs opacity-70">
                              <span className="text-sm">Từ ngày: </span>
                              {convertDateToTimestamp(booking.start_date) +
                                " - " +
                                convertDateToTimestamp(booking.end_date)}
                            </p>
                          </div>
                          <MoreVertIcon fontSize="small" />
                        </div>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <Stack
                    sx={{
                      border: "1px solid #dadae1",
                      borderRadius: "6px",
                      height: "100px",
                      width: "200px",
                      mx: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>Chưa đặt chuyến nào!</span>
                  </Stack>
                )}
              </Menu>
            </div>
          )}
          {userSelector ? (
            <>
              <div
                className="flex gap-2 items-center hover:bg-[#e6e6e6] px-3 py-2 rounded-md"
                onClick={handleClick}
              >
                <AvatarUser user={userSelector} size={30} />
                <div className="cursor-pointer text-[#808089]">Tài khoản</div>
              </div>
              <Popup anchor={anchor} setAnchor={setAnchor}>
                <div className="flex flex-col  text-base text-[#808089]">
                  {userSelector?.role === Role.admin ? (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1 px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] "
                    >
                      <AdminPanelSettingsIcon /> <span>Admin</span>{" "}
                    </Link>
                  ) : userSelector?.role === Role.host ? (
                    <Link
                      to="/host"
                      className="flex items-center gap-1 px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] "
                    >
                      <AdminPanelSettingsIcon /> <span>Host</span>{" "}
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link
                    to="/profile"
                    className="px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] flex gap-1 items-center"
                  >
                    <Person2Icon />
                    <span> Thông tin tài khoản</span>
                  </Link>
                  <div
                    className="cursor-pointer  px-3 py-2 hover:bg-[#e6e6e6] hover:text-[#808089] flex gap-1 items-center"
                    onClick={handleLogout}
                  >
                    <LogoutIcon />
                    <span>Đăng xuất</span>
                  </div>
                </div>
              </Popup>
            </>
          ) : (
            <>
              <Link
                className=" hover:text-[#5A8DEE] transition duration-200 ease-in-out "
                to="/register"
              >
                Đăng kí
              </Link>
              <span>/</span>
              <Link
                className=" hover:text-[#5A8DEE]  transition duration-200 ease-in-out"
                to="/login"
              >
                Đăng nhập
              </Link>
              <Link
                className="  text-white bg-[#5A8DEE] text-center rounded px-4 py-2 hover:text-white hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] btn-register"
                to="/login"
              >
                Chủ nhà
              </Link>
            </>
          )}
        </div>
      </div>
      {openInfor && (
        <ModalComponent handleOpen={handleOpenInfor} open={openInfor}>
          <>
            <Stack
              display={"flex"}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="h6" component="h2" color="primary">
                Chi tiết phòng
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                color={
                  inforBooking?.booking_status === BookingStatus.pending
                    ? "primary"
                    : inforBooking?.booking_status === BookingStatus.success
                    ? "#4caf50"
                    : inforBooking?.booking_status === BookingStatus.cancel
                    ? "error"
                    : "error"
                }
              >
                {inforBooking?.booking_status === BookingStatus.pending
                  ? "Đợi xác nhận "
                  : inforBooking?.booking_status === BookingStatus.success
                  ? "Đã được chấp nhận"
                  : inforBooking?.booking_status === BookingStatus.cancel
                  ? "Đơn đẵ bị hủy"
                  : "Đơn đã bị hủy"}
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} light />
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              <Box sx={{ width: 1 / 2 }}>
                <ImageList sx={{ height: "auto" }} cols={2} rowHeight={164}>
                  {inforRoom!.image.map((item) => (
                    <ImageListItem key={item.id}>
                      <img
                        src={item.url}
                        alt={inforRoom?.city}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>

                <Box sx={{}}>
                  <Divider sx={{ my: 2 }} light />
                  <div className="">
                    <h3 className="font-medium mb-2 ">Mô tả: </h3>
                    <span>{inforRoom?.decription}</span>
                  </div>
                </Box>
              </Box>
              <Box sx={{ width: "45%", mb: 6 }}>
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Tên khách sạn: </h3>
                  <span>{inforRoom?.name}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Loại hình du lịch: </h3>
                  <span>{inforRoom?.type_tourism}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Giá phòng: </h3>
                  <span>{inforRoom?.price}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Địa Chỉ: </h3>
                  <span>{inforRoom?.address}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số lượng phòng ngủ</h3>
                  <span>{inforRoom?.bedroom}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số lượng phòng tắm</h3>
                  <span>{inforRoom?.bathroom}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Từ ngày</h3>
                  <span>
                    {convertDateToTimestamp(inforBooking!.start_date) +
                      " - " +
                      convertDateToTimestamp(inforBooking!.end_date)}{" "}
                  </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số ngày</h3>
                  <span>{inforBooking?.count_date} </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Thanh toán:</h3>
                  <span>{inforBooking?.total} </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Trạng thái thanh toán:</h3>
                  <span>
                    {inforBooking?.pay_status === StatusPayment.pending
                      ? "Chưa thanh toán"
                      : inforBooking?.pay_status === StatusPayment.success
                      ? "đã thanh toán"
                      : ""}{" "}
                  </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between ">
                  <div className=""></div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancel(inforBooking.id)}
                  >
                    Hủy đơn
                  </Button>
                </div>
              </Box>
            </Stack>
          </>
        </ModalComponent>
      )}
    </header>
  );
};

export default Header;
