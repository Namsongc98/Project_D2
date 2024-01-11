import { Box, Button, Modal } from "@mui/material";

import Input from "../element/Input";
import { PropChangePassword } from "../../type";

const Changepassword = ({ handleOpen, open }: PropChangePassword) => {
  return (
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] bg-white shadow-md border border-solid border-[#000] p-4">
          <h1 className="text-center text-2xl mb-3">Đổi mật khẩu</h1>

          <Input
            title="Mật khẩu cũ"
            type="text"
            placeholder="nhập mật khẩu cũ"
            label="password"
            className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
          />

          <Input
            title="Mật khẩu mới"
            type="text"
            placeholder="nhập mật khẩu cũ"
            label="password"
            className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
          />
          <Input
            title="Xác nhận mật khẩu"
            type="text"
            placeholder="nhập mật khẩu cũ"
            label="password"
            className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
          />
          <Button
            type="submit"
            className="text-white bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
          >
            Xác nhận
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Changepassword;
