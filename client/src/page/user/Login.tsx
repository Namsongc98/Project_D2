import Input from "../../component/element/Input";
import Button from "../../component/element/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IFormInput } from "../../type";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AxiosError } from "axios";
import { loginUser } from "../../service";
import { AppDispatch } from "../../store/configStore";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducer/userSlice";
import { setLocalToken } from "../../common/localStogate";

const Login = () => {
  const [error, setError] = useState<string | undefined>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
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
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const message: string | undefined =
    errors?.email?.message || errors?.password?.message;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const login = await loginUser(data);
      dispatch(setUser(login.data.user));
      setLocalToken(login.data.accessToken);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response.data === "Cannot find user") {
          setError("Email không tồn tại");
        } else if (error.response.data === "Incorrect password") {
          setError("Sai mật khẩu");
        }
      }
    }
  };

  useEffect(() => {
    setError(message);
    return () => {
      setError("");
    };
  }, [message]);
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
                className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              />
              <Input
                type="text"
                title="Mật khẩu"
                placeholder="Nhập Password"
                label="password"
                register={register}
                className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              />
              <Button
                type="submit"
                className="text-white bg-[#5A8DEE] mt-6 w-full  shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
              >
                Đăng nhập
              </Button>
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
