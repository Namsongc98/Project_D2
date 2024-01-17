import { IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import { PropAppBarType } from "../../type";
import AvatarUser from "../componentReuse/AvatarUser";
import { useGetUser } from "../../hook";
import { Link, useNavigate } from "react-router-dom";
import { Popup } from "../componentReuse";
import { remoteToken } from "../../common";
import { useState } from "react";
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarComponent = ({ toggleDrawer, open }: PropAppBarType) => {
  const user = useGetUser();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleLogout = () => {
    remoteToken();
    navigate("/login");
  };
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        ></Typography>
        <div
          className="flex gap-2 items-center hover:bg-[#1871ca] px-3 py-2 rounded-md"
          onClick={handleClick}
        >
          <AvatarUser user={user} size={30} />
          <p className="cursor-pointer text-white leading-8 font-semibold">
            Tài khoản
          </p>
        </div>
        <Popup anchor={anchor} setAnchor={setAnchor}>
          <div className="flex flex-col  text-base text-[#808089]">
            {user?.role === "Host" ? (
              <Link
                to="/admin"
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
        </Popup>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
