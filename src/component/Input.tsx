import { memo } from "react";
import { InputType } from "../type";

const Input = (props: InputType): React.JSX.Element => {
  const { register, label, name, placeholder, type } = props;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="font-medium text-[#475F7B] ">
        {label}
      </label>
      <input
        type={type}
        className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
        {...register(name)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(Input);
