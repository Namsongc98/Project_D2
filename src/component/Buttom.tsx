import "./stype.scss";
import { ButomType } from "../type";



const Buttom = (props: ButomType): JSX.Element  => {
  const { type } = props;

  return (
    <button
      type={type}
      className="text-white bg-[#5A8DEE] mt-6 w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] btn-register"
    >
      {props.children}
    </button>
  );
};
export default Buttom;
