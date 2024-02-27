import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AlertComponent = ({ error, type }: { error: string, type: AlertColor | undefined, setError: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <>
      {error ?
        <Stack sx={{ width: "100%" }} spacing={2} >
          <Alert severity={type} >{error}</Alert>
        </Stack> : <></>
      }
    </>
  );
};
export default AlertComponent;
