import { useState } from "react";
import { InputHook } from "../type";


const useInputTypeNumber = (initialValue: string): InputHook => {
    const [value, setValue] = useState<string>(initialValue);
    const onChange = (e: React.FormEvent<HTMLInputElement>): string => {
        const numericValue = e.currentTarget.value.replace(/\D/g, '');
        console.log(numericValue)
        setValue(numericValue);
        return value
    };

    return {
        value,
        onChange,
    };
};
export default useInputTypeNumber;