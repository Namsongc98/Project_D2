import { Box, Modal } from "@mui/material";

import { PropChangePassword } from "../../type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalComponent = ({ handleOpen, open, children }: PropChangePassword) => {
  return (
    <Modal open={open} onClose={handleOpen}>
      <Box sx={{ ...style }}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
