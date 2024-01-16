import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PropsSelect } from "../../type";

const SelectOption = ({ value, options, onChange, label, register, field, defaultValue }: PropsSelect) => {

  return (
    <>
      <FormControl sx={{ minWidth: "100%" }} size="small">
        <InputLabel id="demo-select-small-label" className="bg-white">
          {label}
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          {...(typeof register === "function" && { ...register(field) })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options?.map(({ label, value }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectOption;
