
import { InputType } from "../../type";


const Input = (props: InputType): React.JSX.Element => {
  const { register, label, title, placeholder, type, className, onChange, value } =
    props;

  return (
    <div className="mb-4">
      <label htmlFor={label} className="font-medium text-[#475F7B] ">
        {title}
      </label>
      {onChange ? (
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type={type}
          className={className}
          {...(typeof register === "function" && { ...register(label) })}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
