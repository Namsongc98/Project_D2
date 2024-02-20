import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { PropDrawerType } from "../../type";
import HomeIcon from "@mui/icons-material/Home";

import { NavLink } from "react-router-dom";
import { useGetUser } from "../../hook";

const DrawerComponent = ({ toggleDrawer, open, paths }: PropDrawerType) => {
  const user = useGetUser();
  const drawerWidth = 240;
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {paths?.map((path) => (
          <ListItemButton key={path.id}>
            <NavLink to={path.path} className="flex ">
              <ListItemIcon>{path?.icon}</ListItemIcon>
              <ListItemText primary={path.title} />
            </NavLink>
          </ListItemButton>
        ))}
        <ListItemButton>
          <NavLink to={"/"} className="flex ">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </NavLink>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
