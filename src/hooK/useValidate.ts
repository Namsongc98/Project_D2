import { yupResolver } from "@hookform/resolvers/yup";
import {  useForm } from "react-hook-form";
import * as yup from "yup";
import { IFormInput } from "../type";


const useValidate = () => {
 
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
    confirmPassword: yup
      .string()
      .required("Password là bắt buộc")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const message: string | undefined =
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.confirmPassword?.message;
  console.log(message);

//   const validate = (
//     error:
//       | LiteralUnion<
//           | "onBlur"
//           | "onChange"
//           | "disabled"
//           | "shouldUnregister"
//           | "validate"
//           | "required"
//           | "min"
//           | "max"
//           | "maxLength"
//           | "minLength"
//           | "value"
//           | "setValueAs"
//           | "deps"
//           | "pattern"
//           | "valueAsNumber"
//           | "valueAsDate",
//           string
//         >
//       | undefined
//   ) => {
//     switch (error) {
//       case "required":
//         console.log(message);
//         setError(message);
//         break;
//       case "email":
//         setError(message);
//         break;
//       case "min":
//         setError(message);
//         break;
//       case "max":
//         setError(message);
//         break;
//       case "oneOf":
//         setError(message);
//         break;
//       default:
//         break;
//     }
//   };
//   console.log(error);

//   useEffect(() => {
//     validate(errors.email?.type);
//     validate(errors.password?.type);
//     validate(errors.confirmPassword?.type);
//     return () => {
//       setError("");
//     };
//   }, [errors]);

  return {
    register,
    handleSubmit,
    message,
  };
};
export default useValidate;
