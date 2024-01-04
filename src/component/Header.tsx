import logoLuxstay from "../assets/image/Logo_Luxstay.png";
import { Link } from "react-router-dom";
import "./stype.scss"
const Header = () => {
  return (
    <header className=" bg-[#00AFDD] w-full">
      <div className=" bg-[#00AFDD] pt-11 pb-3 my-0 mx-auto max-w-[1024px]">
        <div className="flex justify-between items-center">
          <img src={logoLuxstay} alt="" width={200} height={62} />
          <div className="flex gap-1 items-center">
            <Link
              className=" text-white bg-[#5A8DEE] text-center  rounded px-2 py-1 hover:text-white hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] btn-register"
              to="/register"
            >
              Đăng kí
            </Link>
            <Link
              className="  text-white bg-[#5A8DEE] text-center rounded px-2 py-1 hover:text-white hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] btn-register"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
        <div>
          <h1 className="pt-24  text-white text-4xl">
            Tìm chuyến bay & khách sạn
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
