import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Button } from "../element";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Role } from "../../type";

const ModalConfirm = ({
  infor,
  handleSuccess,
  handleFail,
  label,
  decription,
  setOpen,
  user,
}: any) => {
  console.log(user?.role);

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6" component="h2">
          {label}
        </Typography>
        <IconButton
          color="error"
          aria-label="add to shopping cart"
          onClick={() => setOpen(false)}
        >
          <HighlightOffIcon />
        </IconButton>
      </Stack>
      <Divider light sx={{ mb: 1 }} />
      <Typography variant="subtitle1" component="h6">
        {decription}
      </Typography>

      <Stack sx={{ mt: 2 }} direction="row" spacing={2}>
        <Button
          type="button"
          className="text-white bg-[#5A8DEE] rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
          onClick={() => infor && handleSuccess(infor.id!)}
        >
          Đồng ý
        </Button>
        {user.role === Role.host ? (
          <Button
            type="button"
            onClick={() => infor && handleFail(infor.id!)}
            className="text-white bg-red-500  rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)] "
          >
            Hủy đơn đặt
          </Button>
        ) : (
          <></>
        )}
        {user.role === Role.admin ? (
          <Button
            type="button"
            onClick={() => infor && handleFail(infor.id!)}
            className="text-white bg-red-500  rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)] "
          >
            Không duyệt
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};

export default ModalConfirm;
