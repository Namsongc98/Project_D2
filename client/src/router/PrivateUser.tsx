import React from "react";
import { Outlet } from "react-router";
import {  NotFound } from "../page/user";
import { getLocalToken } from "../common";

const PrivateUser = () => {
  const token = getLocalToken();
  const privateRouterHost = token;
  return privateRouterHost ? <Outlet /> : <NotFound />;
};

export default PrivateUser;
