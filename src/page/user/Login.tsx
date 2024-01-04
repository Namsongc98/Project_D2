import Input from "../../component/Input";
import { Link } from "react-router-dom";
import Button from "../../component/Buttom";

import { SubmitHandler } from "react-hook-form";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IFormInput } from "../../type";
import { useEffect, useState } from "react";
import { useValidate } from "../../hook";
const Login = () => {
  const [error, setError] = useState<string | undefined>("");
  const { register, handleSubmit, message } = useValidate()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  useEffect(() => {
    setError(message)
    return () => {
      setError("")
    }
  }, [message])
  return (
    <>
      <div className="w-1/2 p-6  ">
        <div className=" text-center  pt-5 pl-7 pr-7 pb-4 ">
          <h4 className=" mb-6 text-[#475F7B] font-normal leading-5 text-2xl">
            Chào mừng bạn quay lại với Asahi Luxstay
          </h4>
        </div>

        <div className="pr-7 pl-7 pb-7 ">
          {/* thông báo lỗi */}
          {error ? (
            <div className="wapper-danger w-full mb-6 bg-red-100 text-red-500 p-3 rounded-md flex items-center">
              <ErrorOutlineIcon className="mr-3" />
              <span className="text-sm">{error}</span>
            </div>
          ) : (
            <></>
          )}

          <div className="flex mt-4 mb-4 justify-between items-center border-solid">
            <div className="w-1/3 border-t-[1px] border-[#DFE3E7] h-[0px] "></div>
            <div className="bg-white px-4">
              <p className="font-normal text-sm text-[#828D99]  whitespace-nowrap ">
                THÔNG TIN ĐĂNG NHẬP
              </p>
            </div>
            <div className="w-1/3 border-t-[1px] border-[#DFE3E7] h-[1px] border-solid "></div>
          </div>
          <div className="">
            {/* form đăng nhập */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                title="Email"
                placeholder="Nhập Email"
                label="email"
                register={register}
              />
              <Input
                type="text"
                title="Mật khẩu"
                placeholder="Nhập Password"
                label="password"
                register={register}
              />
              <Button type="submit">Đăng nhập</Button>
            </form>
            <hr className="my-4" />
            <div className="flex items-center justify-center gap-1 text-[#6658dd] text-sm">

              <Link to="/register">Đăng kí tài khoản</Link>


              <p className="text-black">|</p>
              <Link to="/">Về trang Home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
