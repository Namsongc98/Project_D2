import { memo } from "react";
import { InputType } from "../type";

const Input = (props: InputType): React.JSX.Element => {
  const { register, label, title, placeholder, type, className } = props;
  return (
    <div className="mb-4">
      <label htmlFor={label} className="font-medium text-[#475F7B] ">
        {title}
      </label>
      <input
        type={type}
        className={className}
        {...(typeof register === "function" && { ...register(label) })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(Input);