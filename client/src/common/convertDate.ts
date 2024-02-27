import dayjs from "dayjs";
const convertDateToTimestamp = (timestamp: number | string) => {
  const formattedDate = dayjs(timestamp).format("DD/MM/YYYY");
  return formattedDate;
};

export { convertDateToTimestamp };
