import { useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

const useDate = (defaultValue: string | undefined) => {
  const [value, setValue] = useState<string | undefined>();
  const [timestamp, setTimestamp] = useState<number | null>();


  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    } else {
      const date = new Date();
      date.getFullYear();
      date.getMonth();
      date.getDate();
      const dateNow = dayjs(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      ).format("YYYY-MM-DD");
      setValue(dateNow);
    }
  }, []);

  const onChange = (newValue: Dayjs | null) => {
    setValue(newValue!.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    const startTime = new Date(value!).getTime();
    setTimestamp(startTime)
  }, [value])

  return {
    value,
    onChange,
    timestamp
  };
};
export default useDate;
