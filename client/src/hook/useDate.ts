import { useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

const useDate = () => {
  const [value, setValue] = useState<string>();
  const date = new Date();
  date.getFullYear();
  date.getMonth();
  date.getDate();
  const dateNow = dayjs(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  ).format("YYYY-MM-DD");
  useEffect(() => {
    setValue(dateNow);
  }, []);
  console.log(dateNow)

  const onChange = (newValue: Dayjs | null) => {
    setValue(newValue?.format("YYYY-MM-DD"));
  };

  return {
    value,
    onChange,
  };
};
export default useDate;
