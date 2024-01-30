import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PropTypeSnackBar } from "../../type";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarReuse = ({ type, message, setError }: PropTypeSnackBar) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    message
    console.log(message)
    setError("");
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%", position: "absolute" }}>
        <Snackbar
          open={!!message}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default SnackBarReuse;
