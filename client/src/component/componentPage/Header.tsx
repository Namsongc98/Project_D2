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
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { getBookingUser } from "../../service";
import { IBookingData } from "../../type";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Header = () => {
  const userSelector = useSelector(getUser);
  const [booking, setBooking] = useState<IBookingData[] | undefined>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useGetUser();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

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
                {booking && booking.length > 0 ? (
                  booking?.map((item) => (
                    <MenuItem
                      sx={{ px: "10px", minWidth: "300px" }}
                      key={item.id}
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div className="">
                            <span>{item.name_room}</span>
                            <p className="text-xs opacity-70">
                              <span className="text-sm">Từ ngày: </span>
                              {convertDateToTimestamp(item.start_date) +
                                " - " +
                                convertDateToTimestamp(item.end_date)}
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
                  {userSelector?.role === "Admin" ? (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1 px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] "
                    >
                      <AdminPanelSettingsIcon /> <span>Admin</span>{" "}
                    </Link>
                  ) : userSelector?.role === "Host" ? (
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
    </header>
  );
};

export default Header;
