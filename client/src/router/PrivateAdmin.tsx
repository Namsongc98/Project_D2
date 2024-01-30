import React from "react";
import { Outlet } from "react-router-dom";
import { useGetUser } from "../hook";
import { Role } from "../type";
import { NotFound } from "../page/user";

const PrivateAdmin = (): React.ReactElement | null => {
  const user = useGetUser();
  const privateRouter = user?.role === Role.admin;
  return privateRouter ? <Outlet /> : <NotFound />;
};

export default PrivateAdmin;
