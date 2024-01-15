import React, { useState } from 'react'

const useCheckbox = (initialValue: number | string) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    return {
        value,
        onChange
    }
}

export default useCheckbox