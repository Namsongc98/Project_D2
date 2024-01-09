import "./stype.scss";
import { ButomType } from "../type";

const Buttom = (props: ButomType): JSX.Element => {
  const { type, onClick, className } = props;

  return (
    <button
      type={type}
      className={`${className} btn-register hover:opacity-80 rounded px-6 py-2 `}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};
export default Buttom;
