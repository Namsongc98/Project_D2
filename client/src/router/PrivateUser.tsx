import React from "react";
import { Outlet } from "react-router";

const PrivateUser = () => {
  const privateRouterHost = true;
  return privateRouterHost ? <Outlet /> : <></>;
};

export default PrivateUser;