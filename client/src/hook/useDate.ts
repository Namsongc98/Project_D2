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
  ).format("DD/MM/YYYY");
  useEffect(() => {
    setValue(dateNow);
  }, []);

  const onChange = (newValue: Dayjs | null) => {
    setValue(newValue?.format("DD/MM/YYYY"));
  };

  return {
    value,
    onChange,
  };
};
export default useDate;
