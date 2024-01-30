import { LocalizationProvider } from "@mui/x-date-pickers";

import {
  Box,
  InputBase,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import "../../style/styleComponent.scss";
import { Button, InputSearch, PickDate } from "../element";
import useDate from "../../hook/useDate";
import { useEffect, useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useDebounce } from "../../hook";
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const SearchHotel = () => {
  const inputStartDate = useDate();
  const inputEndDate = useDate();
  const [persion, setPersion] = useState<number | "">("");
  const [search, setSearch] = useState("");
  const deBounce: string = useDebounce(search, 500);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.currentTarget.value.replace(/\D/g, "");
    setPersion(inputValue === "" ? "" : parseFloat(inputValue));
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearch = () => {
    console.log("deBounce", deBounce);
  };

  useEffect(() => {
    handleSearch();
  }, [deBounce]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-[#00AFDD] pt-6 pb-36">
      <div className="max-w-[1024px] p-5  my-0 mx-auto">
        <form
          action=""
          className="flex gap-2 w-full flex-wrap items-center "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="relative bg-white w-2/5 h-12 ">
            <div className="flex items-center relative">
              <InputSearch
                placeholder="Bạn muốn đi đâu?"
                search={search}
                handleSearch={handleOnChange}
              />
            </div>
            <ListItem
              component="div"
              disablePadding
              sx={{ bgcolor: "white", position: "absolute", bottom: "-55px" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocationCityIcon
                    fontSize="small"
                    sx={{ color: "#00afdd" }}
                  />
                </ListItemIcon>
                <ListItemText primary={`Item `} />
              </ListItemButton>
            </ListItem>
          </div>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  width: "30%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <PickDate label="Nhận phòng " {...inputStartDate} />
                <PickDate label="Trả phòng" {...inputEndDate} />
              </Box>
            </LocalizationProvider>
          </ThemeProvider>

          <div className="relative bg-white w-[10%] h-12 flex items-center">
            <label
              htmlFor="person"
              className="absolute top-[-1.3rem] text-[#ffffffb3] uppercase text-[10px] font-semibold"
            >
              {" "}
              Khách
            </label>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={persion}
              onChange={handleChange}
              type="text"
            />
            <EscalatorWarningIcon className="absolute right-[0.7rem]  translate-y-[-170%] top-[50px] text-[#09b2de]" />
          </div>
          <Button
            type="submit"
            className="text-white bg-[#ffa600] h-[50px] w-[15%]"
          >
            Tìm kiếm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchHotel;
