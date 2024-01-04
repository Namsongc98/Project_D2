
import { Link } from "react-router-dom";
import "./stype.scss"
const Header = () => {
  return (
    <header className=" bg-white w-full h-16 ">
      <div className="  my-0 mx-auto max-w-[1024px] flex items-center justify-between h-full">
        <div className="">

        </div>
        <div className="flex gap-2 items-center h-full">
          <Link
            className=" hover:text-[#5A8DEE] transition duration-200 ease-in-out "
            to="/register"
          >
            Đăng kí
          </Link>
          <span>/</span>
          <Link
            className=" hover:text-[#5A8DEE]  transition duration-200 ease-in-out"
            to="/login"
          >
            Đăng nhập
          </Link>
          <Link
            className="  text-white bg-[#5A8DEE] text-center rounded px-4 py-2 hover:text-white hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] btn-register"
            to="/login"
          >
            Chủ nhà
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Header;
