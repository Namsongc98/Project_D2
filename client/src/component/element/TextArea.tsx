import { TextField } from "@mui/material";
import { TextArea } from "../../type";

const TextArea = (props: TextArea) => {
  const { value, onChange, label, register, title, required } = props;
  return (
    <>
      {" "}
      <TextField
        id="standard-multiline-flexible"
        label={title}
        multiline
        maxRows={4}
        minRows={3}
        fullWidth
        value={value}
        onChange={onChange}
        {...(typeof register === "function" && {
          ...register(label, { required: required }),
        })}
      />
    </>
  );
};

export default TextArea;
