import { useState } from "react";
const useSelectOption = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
    setValue
  };
};
export default useSelectOption;