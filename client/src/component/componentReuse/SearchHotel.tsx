import { LocalizationProvider } from "@mui/x-date-pickers";

import { Box, ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


import "../../style/styleComponent.scss";
import { Button, InputSearch, PickDate } from "../element";
import useDate from "../../hook/useDate";

const SearchHotel = () => {
  const inputDate = useDate()
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {

          },
        },
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="w-full bg-[#00AFDD] pt-6 pb-36">
      <div className="max-w-[1024px] p-5  my-0 mx-auto">
        <form action="" className="flex gap-2 w-full flex-wrap items-center " onSubmit={(e) => handleSubmit(e)}>
          <div className="relative bg-white w-2/5 h-12 ">
            <div className="flex items-center relative">
              <InputSearch />
            </div>

          </div>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  width: '40%',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <PickDate label="Nhận phòng " {...inputDate} />
                <PickDate label="Trả phòng"  {...inputDate} />
              </Box>
            </LocalizationProvider>

          </ThemeProvider>

          {/* <div className="relative bg-white w-[13%] h-12 ">
            <label
              htmlFor="person"
              className="absolute top-[-1.3rem] text-[#ffffffb3] uppercase text-[10px] font-semibold"
            >
              {" "}
              Khách
            </label>
            <Input className="text-sm" id="person" defaultValue={`0 khách`} />
            <EscalatorWarningIcon className="absolute right-[0.7rem]  translate-y-[-170%] top-[50px] text-[#09b2de]" />
          </div> */}
          <Button type="submit" className="text-white bg-[#ffa600] h-[50px] w-[18%]" >Tìm kiếm</Button>
        </form>
      </div>
    </div>
  );
};

export default SearchHotel;
