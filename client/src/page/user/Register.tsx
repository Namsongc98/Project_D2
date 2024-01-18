import { Link, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IFormInput, IFormRegister, IUser, Role } from "../../type";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../../service";
import { AxiosError } from "axios";
import { setLocalToken } from "../../common";
import { AppDispatch, useAppDispatch } from "../../store/configStore";
import { setUser } from "../../store/reducer/userSlice";
import { Button, Input } from "../../component/element";
const Register = () => {
  const [error, setError] = useState<string | undefined>("");

  const dispatch: AppDispatch = useAppDispatch();

  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ")
      .min(6, "Passworrd trên 6 kí tự")
      .max(32, "Password dưới 32 kí tự"),
    password: yup
      .string()
      .required("Password là bắt buộc")
      .min(6, "Passworrd trên 6 kí tự")
      .max(32, "Password dưới 32 kí tự"),
    confirmPassword: yup
      .string()
      .required("Password là bắt buộc")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormRegister>({
    resolver: yupResolver(schema),
  });

  const message: string | undefined =
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.confirmPassword?.message;

  useEffect(() => {
    setError(message);
    return () => {
      setError("");
    };
  }, [message]);

  const onSubmit: SubmitHandler<IFormInput> = async (
    data: IUser
  ): Promise<void> => {
    try {
      const id = uuidv4();
      const user: IUser = {
        id,
        email: data.email,
        password: data.password,
        role: Role.guide,
      };
      const registerUser = await createUser(user);
      dispatch(setUser(registerUser.data.user));
      setLocalToken(registerUser.data.accessToken);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response.data === "Email already exists") {
          setError("Email đã được sử dụng");
        }
      }
    }
  };

  return (
    <div className="w-1/2 p-6  ">
      <div className=" text-center  pt-5 pl-7 pr-7 pb-4 ">
        <h4 className=" mb-6 text-[#475F7B] font-normal leading-5 text-2xl">
          Đăng ký tài khoản trên Asahi Luxstay.
        </h4>
      </div>
      <div className="pr-7 pl-7 pb-7 ">
        {/* thông báo lỗi */}
        {error && (
          <div className="wapper-danger w-full mb-6 bg-red-100 text-red-500 p-3 rounded-md flex items-center">
            <ErrorOutlineIcon className="mr-3" />
            <span className="text-sm">{error}</span>
          </div>
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
              title="Email"
              placeholder="Nhập Email"
              label="email"
              register={register}
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              required={true}
            />
            <Input
              type="text"
              title="Mật khẩu"
              placeholder="Nhập Password"
              label="password"
              register={register}
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              required={true}
            />
            <Input
              type="text"
              title="Nhập lại mật khẩu"
              placeholder="Nhập lại Password"
              label="confirmPassword"
              register={register}
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              required={true}
            />

            <Button
              type="submit"
              className="text-white bg-[#5A8DEE] mt-6 w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
            >
              Xác thực & đăng kí
            </Button>
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
