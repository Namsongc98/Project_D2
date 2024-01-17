import React from "react";
import { Outlet } from "react-router-dom";

const PrivateAdmin = (): React.ReactElement | null => {
  const privateRouter = true
  return privateRouter? <Outlet /> : <></>;
};

export default PrivateAdmin;
