import { LocalizationProvider } from "@mui/x-date-pickers";

import { AlertColor, Box, InputBase, List, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import "../../style/styleComponent.scss";
import { Button, InputSearch, PickDate } from "../element";
import useDate from "../../hook/useDate";
import { useEffect, useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useDebounce } from "../../hook";
import { searchCityFindRoom } from "../../service";
import { IRoomPost } from "../../type";
import { SnackBarReuse } from ".";
import { createSearchParams, useNavigate } from "react-router-dom";
import AddLocationIcon from "@mui/icons-material/AddLocation";

const SearchHotel = () => {
  const inputStartDate = useDate();
  const inputEndDate = useDate();
  const [type, setType] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState("");
  const [person, setperson] = useState<number | "">("");
  const [search, setSearch] = useState<string>("");
  const [dataCity, setDataCity] = useState([] as IRoomPost[]);
  const deBounce = useDebounce(search, 500);
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.currentTarget.value.replace(/\D/g, "");
    setperson(inputValue === "" ? "" : parseFloat(inputValue));
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const changeValue = e.currentTarget.value;
    if (!changeValue.startsWith(" ")) {
      setSearch(e.currentTarget.value);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchCityFindRoom(deBounce!);
      setDataCity(res.data);
    } catch (error) {
      throw new Error("Không tìm thấy thành phố");
    }
  };

  useEffect(() => {
    if (!deBounce) {
      setDataCity([]);
      return;
    }
    handleSearch();
  }, [deBounce]);

  const handleClick = (e: any) => {
    setSearch(e.currentTarget.textContent);
    setDataCity([]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputStartDate.timestamp! >= inputEndDate.timestamp!) {
      setType("warning");
      setMessage("Ngày tháng không hợp lệ");
      return;
    } else if (!person) {
      setType("warning");
      setMessage("Mời nhập số lượng người");
      return;
    }
    const params = {
      address: search!,
      checkin: inputStartDate.timestamp!.toString(),
      checkout: inputEndDate.timestamp!.toString(),
      person: person.toString(),
    };
    navigate({
      pathname: "/city/search",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="w-full bg-[#00AFDD] pt-6 pb-36">
      <SnackBarReuse type={type} message={message} setError={setMessage} />
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
                required={true}
              />
              {dataCity.length ? (
                <List
                  component="div"
                  sx={{
                    bgcolor: "white",
                    position: "absolute",
                    top: "55px",
                    maxHeight: 200,
                    width: "100%",
                    overflow: "auto",
                    paddingTop: 1,
                    paddingBottom: 1,
                  }}
                >
                  {dataCity?.map((item) => (
                    <>
                      <MenuItem
                        value={item.address}
                        sx={{ width: "100%" }}
                        onClick={handleClick}
                        key={item.id}
                        selected={search === item.address}
                      >
                        <LocationCityIcon
                          fontSize="small"
                          sx={{ color: "#00afdd", marginRight: 1 }}
                        />
                        {item.city}
                      </MenuItem>
                      <MenuItem
                        value={item.city}
                        sx={{ width: "100%" }}
                        onClick={handleClick}
                        key={item.id}
                        selected={search === item.address}
                      >
                        <AddLocationIcon
                          fontSize="small"
                          sx={{ color: "#00afdd", marginRight: 1 }}
                        />
                        {item.address}
                      </MenuItem>
                    </>
                  ))}
                </List>
              ) : (
                <></>
              )}
            </div>
          </div>
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
              value={person}
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
