import { Box, Modal } from "@mui/material";

import { PropChangePassword } from "../../type";


const ModalComponent = ({ handleOpen, open, children }: PropChangePassword) => {
  return (
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
