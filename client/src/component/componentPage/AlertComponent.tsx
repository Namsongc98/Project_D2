import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertProp } from "../../type";

const AlertComponent = (props: AlertProp) => {
  const { status } = props;

  useEffect(() => {}, []);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={status.type}>{status.message}</Alert>
    </Stack>
  );
};
export default AlertComponent;
