import { useState } from "react";
import { InputHook } from "../type";


const useInput = (initialValue: string): InputHook => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: React.FormEvent<HTMLInputElement>): string => {
    setValue(e.currentTarget.value);
    return value
  };
  return {
    value,
    onChange,
    setValue
  };
};
export default useInput;
