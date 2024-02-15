import { useState } from "react";
import { InputHook } from "../type";


const useInputTypeNumber = (initialValue: string): InputHook => {
    const [value, setValue] = useState<string>(initialValue);
    const onChange = (e: React.FormEvent<HTMLInputElement>): string => {
        const numericValue = e.currentTarget.value.replace(/\D/g, '');
        setValue(numericValue);
        return value
    };
    return {
        value,
        onChange,
        setValue
    };
};
export default useInputTypeNumber;