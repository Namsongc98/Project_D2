import { Button, Input } from "../element";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { IChangePassword, IChangePasswordSubmit, StatusApi } from "../../type";
import { useEffect, useState } from "react";
import { AlertComponent } from ".";

const Changepassword = () => {
  const [error, setError] = useState<string | undefined>("");
  const [statusApi, setStatusApi] = useState<StatusApi>({
    type: "",
    message: "",
  });
  const schema = yup.object({
    oldPassword: yup
      .string()
      .required("Email là bắt buộc")
      .min(6, "Passworrd trên 6 kí tự")
      .max(32, "Password dưới 32 kí tự"),
    newPassword: yup
      .string()
      .required("Password là bắt buộc")
      .min(6, "Passworrd trên 6 kí tự")
      .max(32, "Password dưới 32 kí tự"),
    confirmNewPassword: yup
      .string()
      .required("Password là bắt buộc")
      .oneOf([yup.ref("newPassword")], "Xác nhận lại mật khẩu"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IChangePassword>({
    resolver: yupResolver(schema),
  });
  console.log(error);
  const message: string | undefined =
    errors?.oldPassword?.message ||
    errors?.newPassword?.message ||
    errors?.confirmNewPassword?.message;
  useEffect(() => {
    setError(message);
    return () => {
      setError("");
    };
  }, [message]);
  useEffect(() => {
    if (error) {
      setStatusApi({ type: "error", message: error });
    }
    return () => {
      setStatusApi({
        type: "",
        message: "",
      });
    };
  }, [error]);

  const onSubmit: SubmitHandler<IChangePasswordSubmit> = () => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] bg-white shadow-md border border-solid border-[#000] p-4"
    >
      {error && <AlertComponent status={statusApi} />}
      <h1 className="text-center text-2xl mb-3">Đổi mật khẩu</h1>
      <Input
        title="Mật khẩu cũ"
        type="text"
        placeholder="nhập mật khẩu cũ"
        label="oldPassword"
        className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
        register={register}
      />

      <Input
        title="Mật khẩu mới"
        type="text"
        placeholder="Nhập mật khẩu mới"
        label="newPassword"
        className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
        register={register}
      />
      <Input
        title="Xác nhận mật khẩu"
        type="text"
        placeholder="Xác nhận mật khẩu"
        label="confirmNewPassword"
        className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
        register={register}
      />
      <Button
        type="submit"
        className="text-white bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
      >
        Xác nhận
      </Button>
    </form>
  );
};

export default Changepassword;
