import React from "react";
import { Outlet } from "react-router";
import { useGetUser } from "../hook";
import { Role } from "../type";
import { NotFound } from "../page/user";

const PrivateHost = () => {
  const user = useGetUser();
  const privateRouterHost =
    user?.role === Role.host || user?.role === Role.admin;
  return privateRouterHost ? <Outlet /> : <NotFound />;
};

export default PrivateHost;
