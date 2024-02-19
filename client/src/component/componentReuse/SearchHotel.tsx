import { LocalizationProvider } from "@mui/x-date-pickers";
import { AlertColor, Box, InputBase } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import "../../style/styleComponent.scss";
import { Button, InputSearch, PickDate } from "../element";
import useDate from "../../hook/useDate";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hook";
import { searchCityFindRoom } from "../../service";
import { IRoomPost } from "../../type";
import { SnackBarReuse } from ".";
import { createSearchParams, useNavigate } from "react-router-dom";

const SearchHotel = () => {
  const inputStartDate = useDate(undefined);
  const inputEndDate = useDate(undefined);
  const [type, setType] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState("");
  const [person, setPerson] = useState<number | "">("");
  const [search, setSearch] = useState<string>("");
  const [itemRoom, setItemRoom] = useState<IRoomPost | null>(null);
  const [dataCity, setDataCity] = useState([] as IRoomPost[]);
  const deBounce = useDebounce(search, 500);
  const navigate = useNavigate();

  // input Person
  const handleChangePerson: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputValue = e.currentTarget.value.replace(/\D/g, "");
    setPerson(inputValue === "" ? "" : parseFloat(inputValue));
  };

  const handleOnChange = (_: any, value: string) => {
    if (!value.startsWith(" ")) {
      setSearch(value);
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

  const handleChange = (newValue: IRoomPost) => {
    setItemRoom(newValue);
    setSearch(newValue.city);
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
      checkin: inputStartDate.value!.toString(),
      checkout: inputEndDate.value!.toString(),
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
                search={search}
                handleSearch={handleOnChange}
                data={dataCity}
                onChange={handleChange}
                item={itemRoom!}
              />
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
              onChange={handleChangePerson}
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
