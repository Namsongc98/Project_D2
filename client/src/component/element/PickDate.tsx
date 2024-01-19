import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { PropDatePick } from "../../type";
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiTextField-root": {
            width: "100%",
            height: "50px",
            ".Mui-focused": {
              border: "3px solid #fdd835",
            },
            ".MuiOutlinedInput-root": {
              borderRadius: 0,
              height: "100%",
            },
            ".MuiSvgIcon-root": {
              color: "#00afdd",
            },
          },
        },
      },
    },
  },
});
const PickDate = (props: PropDatePick) => {
  const { onChange, value, label } = props;

  return (
    <div className="relative w-1/2">
      <label className="absolute top-[-25px] text-white opacity-70 text-sm">
        {label}
      </label>
      <ThemeProvider theme={theme}>
        <DatePicker
          sx={{
            width: 260,
            backgroundColor: "white",
            position: "absolute",
            height: 50,
            borderRadius: 0,
          }}
          defaultValue={dayjs(value)}
          onChange={(newValue: Dayjs | null) => onChange(newValue)}
        />
      </ThemeProvider>
    </div>
  );
};

export default PickDate;
