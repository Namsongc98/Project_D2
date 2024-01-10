import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { StatusApi } from '../type';




const Toast = ({ status }: StatusApi) => {

  switch (status.type) {
    case "error":
      toast.error(status.message, {
        position: toast.POSITION.TOP_LEFT
      });
      break;
    case "warn":
      toast.warn("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    case "success":
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case "info":
      toast.info("Info Notification !", {
        position: toast.POSITION.BOTTOM_CENTER
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
}

export default Toast