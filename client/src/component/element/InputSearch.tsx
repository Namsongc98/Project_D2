import { ThemeProvider } from "@emotion/react";
import {
  Autocomplete,
  IconButton,
  InputBase,
  InputLabel,
  TextField,
  createTheme,
} from "@mui/material";
import iconCity from "../../assets/image/icon-city.svg";

const themeCity = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.MuiAutocomplete-root": {
            backgroundColor:"red",
            ".MuiFormControl-root": {
              height: "50px",
            },
          },
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
  required,
  data,
}: {
  placeholder: string;
  search: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  required: boolean;
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
        <Autocomplete
          id="filter-demo"
          options={data}
          // getOptionLabel={(option) => option.title}
          // filterOptions={filterOptions}
          sx={{
            ml: 1,
            flex: 1,
            width: "100%",
            height: 50,
            position: "absolute",
            left: 0,
            top: 0,
            margin: 0,
            
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{ height: "100%" }} />
          )}
        />
        <IconButton
          type="button"
          sx={{
            p: "10px",
            position: "absolute",
            right: "3px",
            top: "3px",
            width: 40,
            height: 40,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
          aria-label="search"
        >
          <img src={iconCity} alt="" width={25} height={25} />
        </IconButton>
      </ThemeProvider>
      {/* <ThemeProvider theme={themeCity}>
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
          required={required}
        />
        <IconButton
          type="button"
          sx={{
            p: "10px",
            position: "absolute",
            right: "3px",
            top: "3px",
            width: 40,
            height: 40,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
          aria-label="search"
        >
          <img src={iconCity} alt="" width={25} height={25} />
        </IconButton>
      </ThemeProvider> */}
    </>
  );
};

export default InputSearch;
