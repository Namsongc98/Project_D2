import { memo } from "react";
import { InputType } from "../type";

const Input = (props: InputType): React.JSX.Element => {
  const { register, label, title, placeholder, type } = props;
  console.log(register);
  return (
    <div className="mb-4">
      <label htmlFor={label} className="font-medium text-[#475F7B] ">
        {title}
      </label>
      <input
        type={type}
        className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
        {...(typeof register === "function" && { ...register(label) })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(Input);
