import { Box, Modal } from "@mui/material";

import { PropChangePassword } from "../../type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalComponent = ({ setOpen, open, children }: PropChangePassword) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, minWidth: "400px" }}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
