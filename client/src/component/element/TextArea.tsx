import { TextField } from "@mui/material";
import { TextArea } from "../../type";

const TextArea = (props: TextArea) => {
  const { value, onChange, label } = props;
  return (
    <>
      {" "}
      <TextField
        id="standard-multiline-flexible"
        label={label}
        multiline
        maxRows={4}
        minRows={3}
        fullWidth
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TextArea;
