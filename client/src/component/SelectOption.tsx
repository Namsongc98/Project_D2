import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PropsSelect } from "../type";

const SelectOption = ({ value, options, onChange }: PropsSelect) => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label" className="bg-white">
          Giới tính
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="Age"
          onChange={onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map(({ label, value }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export { SelectOption };
