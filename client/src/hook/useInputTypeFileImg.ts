import { ChangeEvent, useState } from "react";
import { InputFileHook } from "../type";


const useInputTypeFileImg = (initialValue: string): InputFileHook => {
  const [value, setValue] = useState<string>(initialValue);
  const [avatarView, setAvatarView] = useState<string>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileView = e.target.files[0];

    setValue(fileView);
    fileView.preview = URL.createObjectURL(fileView);
    setAvatarView(fileView);
};
 

  return {
    avatarView,
    value,
    onChange,
  };
};
export default useInputTypeFileImg;