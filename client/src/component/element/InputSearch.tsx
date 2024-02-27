import { ThemeProvider } from "@emotion/react";
import {
  Autocomplete,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import iconCity from "../../assets/image/icon-city.svg";
import { IRoomPost } from "../../type";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Box } from "@mui/system";

const themeCity = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "&.MuiAutocomplete-root": {
            ".MuiOutlinedInput-root": {
              borderRadius: 0,
              height: "100%",
              padding: "0px",
              outLined: "none"
            },
            ".MuiAutocomplete-endAdornment": {
              display: "none",
            }
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
  search,
  handleSearch,
  data,
  onChange,
  item,
}: {
  search: string;
  handleSearch: (e: React.SyntheticEvent<Element, Event>, v: string) => void;
  onChange: (newValue: IRoomPost) => void
  data: IRoomPost[],
  item: IRoomPost
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
          id="search-city"
          options={data}
          getOptionLabel={({ city }) => {
            return `${city ? city : ""}`;
          }}
          value={item}
          onChange={(_: any, newValue: IRoomPost | null) => {
            onChange(newValue!)
          }}
          inputValue={search}
          onInputChange={(e: React.SyntheticEvent<Element, Event>, v: string) => handleSearch(e, v)}
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
          isOptionEqualToValue={(option, value) => option.id === value.id}
          filterOptions={(x) => x}
          filterSelectedOptions
          autoComplete
          includeInputInList
          renderOption={(props, option) => {
            return (
              <li  {...props} key={props.id}>
                <Grid container alignItems="center">
                  <Grid item sx={{ display: 'flex', width: 30 }}>
                    <LocationCityIcon fontSize="small"
                      sx={{ color: "#00afdd", marginRight: 1 }} />
                  </Grid>
                  <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>

                    <Box
                      component="span"
                    >
                      {option.city}
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {option.address}
                    </Typography>
                  </Grid>
                </Grid>
              </li>

            )
          }

          }
          renderInput={(params) => (
            <TextField {...params}
              sx={{ height: "100%" }} />
          )}
        />
        <IconButton
          type="button"
          sx={{
            p: "10px",
            position: "absolute",
            right: "5px",
            top: "5px",
            width: 40,
            height: 40,
            display: "flex",
            justifyItems: "center",
            alignItems: "center",

          }}
          aria-label="search"
        >
          <img src={iconCity} alt="" width={20} height={20} />
        </IconButton>
      </ThemeProvider >
    </>
  );
};

export default InputSearch;
