import { useState } from "react";
import { Input } from "../type";


const useInput = (initialValue: string):Input => {
  const [value, setValue] = useState<string>(initialValue);
  const handleChange = (e: React.FormEvent<HTMLInputElement>):string  => {
    setValue(e.currentTarget.value);
    return value
  };
  return {
    value,
    handleChange,
    
  };
};
export default useInput;
