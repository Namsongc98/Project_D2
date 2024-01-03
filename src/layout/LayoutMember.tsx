import { Outlet } from "react-router-dom";
import LoginImg from "../assets/image/login.png";
const LayoutMember = () => {
  return (
    <>
      <section className="bg-[url('./src/assets/image/auth-bg.jpg')] w-dvw h-dvh flex justify-center items-center">
        <div className="flex  bg-white w-2/3 shadow-[-8px_20px_25px_0_rgba(25,42,70,0.3)] rounded">
          <Outlet />
          <div className="w-1/2 self-center p-12 mt-10 mb-10">
            <img src={LoginImg} alt="" className="img-register" />
          </div>
        </div>
      </section>
    </>
  );
};
export default LayoutMember;
