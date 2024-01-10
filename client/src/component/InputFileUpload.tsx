
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { InputFileHook } from "../type";



const InputFileUpload = (props: InputFileHook) => {

  const { onChange } = props;

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      
    >
      Upload file
      <input hidden type="file" onChange={(e)=>onChange(e)}/>
    </Button>
  );
};

export default InputFileUpload;
