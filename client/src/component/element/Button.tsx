import "../../style/styleComponent.scss";
import { ButonType } from "../../type";

const Button = (props: ButonType): JSX.Element => {
  const { type, onClick, className } = props;

  return (
    <>{onClick ? < button type={type} className={`${className} btn-register hover:opacity-80 rounded px-6 py-2 `}
      onClick={onClick}
    >
      {props.children}
    </button > : < button type={type} className={`${className} btn-register hover:opacity-80 rounded px-6 py-2 `}
    >
      {props.children}
    </button >}</>
  );
};
export default Button;
