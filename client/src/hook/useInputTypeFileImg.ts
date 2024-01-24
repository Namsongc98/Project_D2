import { useEffect, useState } from "react";
import { InputFileHook } from "../type";

const useInputTypeFileImg = (initialValue: string): InputFileHook => {
  const [valueImg, setValueImg] = useState<string | File>("");
  const [avatarView, setAvatarView] = useState<string>(initialValue);
  const [errorImg, setError] = useState("");
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      setError("Bạn chưa chọn ảnh");
      return;
    }
    const fileView = e.currentTarget.files[0];
    setValueImg(fileView);
    setAvatarView(URL.createObjectURL(fileView));
    if (!allowedTypes.includes(fileView?.type)) {
      setError("Chỉ sử dụng ảnh kiểu JPEG, PNG, GIF");
    }
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatarView);
    };
  }, [avatarView]);

  return {
    avatarView,
    onChange,
    errorImg,
    valueImg,
    setValueImg,
  };
};
export default useInputTypeFileImg;
