import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Button, Input, ThemeProvider, createTheme } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import iconCity from "../../assets/image/icon-city.svg";
import "../../style/styleComponent.scss";
import { blue } from "@mui/material/colors";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
const SearchHotel = () => {
  const [startDate, setStartDate] = useState<string | null | dayjs.Dayjs>("");
  const [endDate, setEndDate] = useState<string | null | dayjs.Dayjs>("");
  const date = new Date();
  date.getFullYear();
  date.getMonth();
  date.getDate();
  const dateNow: dayjs.Dayjs = dayjs(
    `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  );
  useEffect(() => {
    setStartDate(dateNow);
    setEndDate(dateNow);
  }, []);

  const theme = createTheme({
    palette: {
      primary: blue,
      secondary: {
        main: "#f6a000",
      },
    },
  });

  return (
    <div className="w-full  bg-[#00AFDD] pt-6 pb-36">
      <div className="max-w-[1024px] p-5  my-0 mx-auto">
        <form action="" className="flex gap-2 w-full flex-wrap items-center ">
          <div className="relative bg-white w-1/3 h-12 ">
            <label
              htmlFor="city"
              className="absolute top-[-1.3rem] text-[#ffffffb3] uppercase text-[10px] font-semibold"
            >
              {" "}
              Tên khách sạn
            </label>
            <Input
              autoFocus
              className="text-sm"
              id="city"
              defaultValue={"Ho Chi Minh, Viet Nam"}
            />
            <img
              src={iconCity}
              alt=""
              width={25}
              height={25}
              className="absolute right-[0.7rem]  translate-y-[-170%] "
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <div className="wapper-room">
                <label className="absolute top-[-1.3rem] text-[#ffffffb3] uppercase text-[10px] font-semibold">
                  Nhận phòng
                </label>
                <DatePicker
                  defaultValue={startDate}
                  className=" bg-white date-picker"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </div>
              <div className="wapper-room">
                <label className="absolute top-[-1.3rem] text-[#ffffffb3] right-1 uppercase text-[10px] font-semibold z-10">
                  Trả phòng
                </label>
                <DatePicker
                  defaultValue={endDate}
                  className=" bg-white date-picker "
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <div className="relative bg-white w-[13%] h-12 ">
            <label
              htmlFor="person"
              className="absolute top-[-1.3rem] text-[#ffffffb3] uppercase text-[10px] font-semibold"
            >
              {" "}
              Khách
            </label>
            <Input className="text-sm" id="person" defaultValue={`0 khách`} />
            <EscalatorWarningIcon className="absolute right-[0.7rem]  translate-y-[-170%] top-[50px] text-[#09b2de]" />
          </div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              disableElevation
              className="btn-search "
              color="secondary"
            >
              Tìm kiếm
            </Button>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );
};

export default SearchHotel;
