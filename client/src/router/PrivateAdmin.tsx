import { Outlet, useNavigate } from "react-router-dom";
import { useGetUser } from "../hook";
import { Role } from "../type";

const PrivateAdmin: React.FC = () => {
  const user = useGetUser();
  const privateRouter = user?.role === Role.admin;
  const navigate = useNavigate();
  return privateRouter ? <Outlet /> : <>{navigate("*")}</>;
};

export default PrivateAdmin;
