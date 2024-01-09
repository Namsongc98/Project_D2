import React from "react";
import { Outlet } from "react-router-dom";
import { getUserToken } from "../config";

const PrivateAdmin = (): React.ReactElement | null => {
  const privateRouter = getUserToken();
  console.log(privateRouter);
  return privateRouter.role === "Admin" ? <Outlet /> : <></>;
};

export default PrivateAdmin;
