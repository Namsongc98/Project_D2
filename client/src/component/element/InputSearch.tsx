import { ThemeProvider } from "@emotion/react";
import { IconButton, InputBase, InputLabel, createTheme } from "@mui/material";
import iconCity from "../../assets/image/icon-city.svg";

const themeCity = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            border: "3px solid #fdd835",
          },
        },
      },
    },
  },
});
const InputSearch = ({
  placeholder,
  search,
  handleSearch,
}: {
  placeholder: string;
  search: string;
  handleSearch:React.ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <>
      {" "}
      <ThemeProvider theme={themeCity}>
        <InputLabel
          htmlFor="my-input"
          className="absolute top-[-25px]"
          sx={{ color: "white", opacity: 0.7, fontSize: 14 }}
        >
          TÊN THÀNH PHỐ HOẶC KHÁCH SẠN
        </InputLabel>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            width: "100%",
            height: 50,
            position: "absolute",
            left: 0,
            top: 0,
            margin: 0,
            paddingLeft: "10px",
          }}
          placeholder={placeholder}
          value={search}
          onChange={handleSearch}
          inputProps={{ "aria-label": "search google maps" }}
          fullWidth
        />
        <IconButton
          type="button"
          sx={{
            p: "10px",
            position: "absolute",
            right: 0,
            top: 0,
            width: 50,
            height: 50,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
          aria-label="search"
        >
          <img src={iconCity} alt="" width={25} height={25} />
        </IconButton>
      </ThemeProvider>
    </>
  );
};

export default InputSearch;
