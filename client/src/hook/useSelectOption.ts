import { useState } from "react";
const useSelectOption = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: any): string => {
    setValue(e.target.value);
   
    return value
  };

  return {
    value,
    onChange,
  };
};
export default useSelectOption;