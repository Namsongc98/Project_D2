import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { InputFile } from "../../type";

const InputFileUpload = (props: InputFile) => {
  const { onChange } = props;

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <input hidden type="file" onChange={(e) => onChange(e)} />
    </Button>
  );
};

export default InputFileUpload;
