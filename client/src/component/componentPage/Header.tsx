import { Link, useNavigate } from "react-router-dom";
import "../../style/styleComponent.scss";
import { useLayoutEffect, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import { useGetUser } from "../../hook";
import Popup from "../componentReuse/Popup";
import { remoteToken } from "../../common";
import AvatarUser from "../componentReuse/AvatarUser";
import { useSelector } from "react-redux";
import { getUser, setUser } from "../../store/reducer/userSlice";
import { useDispatch } from "react-redux";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookIcon from "@mui/icons-material/Book";
import { Role } from "../../type";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useGetUser();
  const userSelector = useSelector(getUser);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  useLayoutEffect(() => {
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
          <Link
            to="/city"
            className="flex gap-2 items-center hover:bg-[#e0ecff] px-3 py-2 rounded-md text-base text-[#00afdd]"
          >
            <LocationCityIcon className="text-[#00afdd]" />
            <p>Danh sách phòng</p>
          </Link>
          {userSelector && (
            <Link
              to="/user"
              className="flex gap-2 items-center hover:bg-[#e0ecff] px-3 py-2 rounded-md text-base text-[#00afdd]"
            >
              <BookIcon /> <span>Đơn đặt</span>
            </Link>
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
                  {userSelector?.role === Role.admin && userSelector?.id ? (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1 px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] "
                    >
                      <AdminPanelSettingsIcon /> <span>Admin</span>{" "}
                    </Link>
                  ) : userSelector?.role === Role.host && userSelector?.id ? (
                    <Link
                      to={`/host`}
                      className="flex items-center gap-1 px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] "
                    >
                      <AdminPanelSettingsIcon /> <span>Host</span>{" "}
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link
                    to="user/profile"
                    className="px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] flex gap-1 items-center"
                  >
                    <Person2Icon />
                    <span> Thông tin tài khoản</span>
                  </Link>
                  <Link
                    to="user"
                    className="px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] flex gap-1 items-center"
                  >
                    <Person2Icon />
                    <span>Đơn đặt</span>
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
                className="hover:text-[#5A8DEE] transition duration-200 ease-in-out"
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
