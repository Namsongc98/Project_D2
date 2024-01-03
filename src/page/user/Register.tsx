import Input from "../../component/Input";
import "./style/registerLogin.scss";

import Button from "../../component/Buttom";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../type";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const [error, setError] = useState<string>("Mời nhập đây đủ các ô");
  const [statusError, setStatusError] = useState<boolean>(false);

  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ")
        .min(8, "Passworrd trên 8 kí tự")
        .max(32, "Password dưới 32 kí tự"),
      password: yup
        .string()
        .required("Password là bắt buộc")
        .min(8, "Passworrd trên 8 kí tự")
        .max(32, "Password dưới 32 kí tự"),
      confirmPassword: yup
        .string()
        .required("Password là bắt buộc")
        .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
    })
    .required("Mời nhập đây đủ các ô");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  const checkEmtry =
    errors.email?.type === "required" ||
    errors.password?.type === "required" ||
    errors.confirmPassword?.type === "required";

  useEffect(() => {
    if (checkEmtry) {
      setError("Nhập đầy đủ các trường");
      setStatusError(true);
    } else if (errors.email?.type === "email") {
      setError(errors.email.message!);
      setStatusError(true);
    } else if (errors.email?.type === "min") {
      setError(errors.email.message!);
      setStatusError(true);
    } else if (errors.email?.type === "max") {
      setError(errors.email.message!);
      setStatusError(true);
    } else if (errors.password?.type === "min") {
      setError(errors.password.message!);
      setStatusError(true);
    } else if (errors.password?.type === "max") {
      setError(errors.password.message!);
      setStatusError(true);
    } else if (errors.confirmPassword?.type === "oneOf") {
      setError(errors.confirmPassword.message!);
      setStatusError(true);
    } else {
      setStatusError(false);
    }
  }, [errors]);

  console.log(checkEmtry || statusError);
  console.log(errors.email?.type);
  console.log(errors.password?.type);
  console.log(errors.confirmPassword?.type);

  return (
    <div className="w-1/2 p-6  ">
      <div className=" text-center  pt-5 pl-7 pr-7 pb-4 ">
        <h4 className=" mb-6 text-[#475F7B] font-normal leading-5 text-2xl">
          Đăng ký tài khoản trên Asahi Luxstay.
        </h4>
      </div>

      <div className="pr-7 pl-7 pb-7 ">
        {/* thông báo lỗi */}
        {checkEmtry || statusError ? (
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
              THÔNG TIN ĐĂNG Kí
            </p>
          </div>
          <div className="w-1/3 border-t-[1px] border-[#DFE3E7] h-[1px] border-solid "></div>
        </div>
        <div className="">
          {/* form đăng nhập */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="Email"
              placeholder="Nhập Email"
              name="email"
              register={register}
            />
            <Input
              type="text"
              label="Mật khẩu"
              placeholder="Nhập Password"
              name="password"
              register={register}
            />
            <Input
              type="text"
              label="Nhập lại mật khẩu"
              placeholder="Nhập lại Password"
              name="confirmPassword"
              register={register}
            />

            <Button type="submit">Xác thực & đăng kí</Button>
          </form>
          <hr className="my-4" />
          <div className="flex items-center justify-center gap-1 text-[#6658dd] text-sm">
            <Link to="/login">Đăng nhập bằng tài khoản</Link>
            <p className="text-black">|</p>
            <Link to="/">Về trang Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
