import { useState } from "react";

type Input = {
  value: string;
  handleChange: () => string;
  reset: () => string;
};
const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const handleChange = (e: React.FormEvent<HTMLInputElement>): Input | void => {
    setValue(e.currentTarget.value);
  };
  return {
    value,
    handleChange,
    reset: () => setValue(""),
  };
};
export default useInput;
