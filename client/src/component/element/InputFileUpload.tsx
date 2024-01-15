import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { InputFile } from "../../type";

const InputFileUpload = (props: InputFile) => {
  const { handleChange, multiple } = props;

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      {multiple ?
        <input hidden type="file" onChange={(e) => handleChange(e)} multiple /> :
        <input hidden type="file" onChange={(e) => handleChange(e)} />
      }
    </Button>
  );
};

export default InputFileUpload;
