import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/styleComponent.scss";
import { useEffect, useState } from "react";
import { IProfile } from "../type";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarDefault from "../assets/image/userImg.png";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/material";
import { remoteUser } from "../config";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
const Header = () => {
  const [currenEmail, setCurrenEmail] = useState<IProfile>();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setCurrenEmail(user);
  }, []);

  useEffect(() => {
    return () => {
      setAnchor(null);
    };
  }, [location]);

  const PopupBody = styled("div")(
    () => `
    width: max-content;
    padding: 12px 0px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid #DAE2ED;
    background-color: white;
    box-shadow: 0px 4px 8px rgb(0 0 0 / 0.1);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `
  );

  const handleLogout = () => {
    remoteUser();
    navigate("/login");
  };

  return (
    <header className=" bg-white w-full h-16 shadow-md">
      <div className="  my-0 mx-auto max-w-[1024px] flex items-center justify-between h-full">
        <div className=""></div>
        <div className="flex gap-2 items-center h-full">
          <Link
            to="/"
            className="flex gap-2 items-center hover:bg-[#e0ecff] px-3 py-2 rounded-md text-base text-[#1e68ff]"
          >
            <HomeIcon className="text-[#1e68ff]" />
            <p>Trang chủ</p>
          </Link>
          {currenEmail ? (
            <>
              <Stack
                direction="row"
                spacing={2}
                onClick={handleClick}
                className=""
              >
                <div className="flex gap-2 items-center hover:bg-[#e6e6e6] px-3 py-2 rounded-md">
                  {currenEmail.image ? (
                    <Avatar
                      alt={currenEmail.lastName}
                      src={currenEmail.image || AvatarDefault}
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Avatar
                      alt={currenEmail.email}
                      src={AvatarDefault}
                      sx={{ width: 30, height: 30 }}
                    />
                  )}
                  <div className="cursor-pointer text-[#808089]">Tài khoản</div>
                </div>
              </Stack>
              <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody>
                  <div className="flex flex-col  text-base text-[#808089]">
                    {currenEmail.role === "Admin" ? (
                      <Link
                        to="/user"
                        className="flex items-center gap-1 px-3 hover:bg-[#e6e6e6] py-2 hover:text-[#808089] "
                      >
                        <AdminPanelSettingsIcon /> <span>Admin</span>{" "}
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
                </PopupBody>
              </BasePopup>
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
