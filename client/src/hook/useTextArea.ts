import { useState } from "react";
import { TextArea } from "../type";


const useTextArea = (initialValue: string): TextArea => {
    const [value, setValue] = useState<string>(initialValue);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    };
    return {
        value,
        onChange,
        setValue
    };
};
export default useTextArea;
