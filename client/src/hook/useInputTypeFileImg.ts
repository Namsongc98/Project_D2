import { useEffect, useState } from "react";
import { InputFileHook } from "../type";

const useInputTypeFileImg = (initialValue: string | File): InputFileHook => {
  const [value, setValue] = useState(initialValue);
  const [avatarView, setAvatarView] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const fileView = e.currentTarget.files[0];
    setValue(fileView);
    setAvatarView(URL.createObjectURL(fileView));
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatarView);
    };
  }, [avatarView]);

  return {
    avatarView,
    value,
    onChange,
  };
};
export default useInputTypeFileImg;
