import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useGetUser } from "../hook";
import { Role } from "../type";

const PrivateHost: React.FC = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  const privateRouterHost =
    user?.role === Role.host || user?.role === Role.admin;
  return privateRouterHost ? <Outlet /> : <>{navigate("*")}</>;
};

export default PrivateHost;
