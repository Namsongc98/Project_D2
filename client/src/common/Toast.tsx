import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProp } from "../type";

const Toast = (props: ToastProp) => {
  const { status } = props;
  switch (status.type) {
    case "error":
      toast.error(status.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "warn":
      toast.warn("Warning Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "success":
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "info":
      toast.info("Info Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      toast("Default Notification !");
      break;
  }
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Toast;
