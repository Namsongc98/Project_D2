import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProp } from "../../type";
import { useEffect, useState } from "react";

const ToastComponent = (props: ToastProp) => {
  const { status, setStatusApi } = props;

  switch (status.type) {
    case "error":
      console.log(status)
      toast.error(status.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "warn":
      toast.warn(status.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "success":
      toast.success(status.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "info":
      toast.info(status.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      break;
  }
  useEffect(() => {
    console.log(status)
    return () => {
      setStatusApi({ type: "", message: "" });
    };
  }, [status]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ToastComponent;
