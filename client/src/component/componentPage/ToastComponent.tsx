import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProp } from "../../type";
import { useEffect, useState } from "react";

const ToastComponent = (props: ToastProp) => {
  const { status } = props;
  const [rest, setReset] = useState(status);
  switch (rest.type) {
    case "error":
      toast.error(rest.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "warn":
      toast.warn(rest.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "success":
      toast.success(rest.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "info":
      toast.info(rest.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      break;
  }
  useEffect(() => {
    return () => {
      setReset((prevStatus) => ({
        ...prevStatus,
        type: "",
        message: "",
      }));
    };
  }, [status]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ToastComponent;
