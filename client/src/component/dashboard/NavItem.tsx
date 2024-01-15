import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <NavLink to="/host" className="flex ">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Thống kê phòng" />
      </NavLink>
    </ListItemButton>
    <ListItemButton>
      <NavLink to="host/postroom" className="flex ">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Thống kê phòng" />
      </NavLink>
    </ListItemButton>
  </React.Fragment>
);
