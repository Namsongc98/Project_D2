import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { checkboxType } from "../../type";
import {  ThemeProvider, createTheme } from "@mui/material";

const RadiosElement = (prop: checkboxType) => {
  const { value, onChange, checkbox, label } = prop;

  const theme = createTheme({
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            "&.MuiFormControl-root": {
              padding: "0 8px",
            },
            "&.css-u4tvz2-MuiFormLabel-root": {
              fontSize: "16px",
              color: "#475F7B",
              fontWeight: 600,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={onChange}
        >
          {checkbox?.map((radio: string | number) => (
            <FormControlLabel value={radio} control={<Radio />} label={radio} />
          ))}
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
};

export default RadiosElement;
