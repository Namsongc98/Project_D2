import React from "react";
import { Outlet } from "react-router";

const PrivateHost = () => {
  const privateRouterHost = true;
  return privateRouterHost ? <Outlet /> : <></>;
};

export default PrivateHost;
