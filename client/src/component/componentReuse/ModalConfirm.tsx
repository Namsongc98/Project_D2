import { Stack, Typography } from "@mui/material";
import { Button } from "../element";

const ModalConfirm = ({ infor, handleSuccess, handleFail, label }: any) => {
  return (
    <>
      <Typography variant="h6" component="h2">
        {label}
      </Typography>
      {infor && <Typography component="p">{infor?.name}</Typography>}
      <Stack sx={{ mt: 4 }} direction="row" spacing={2}>
        <Button
          type="button"
          className="text-white bg-[#5A8DEE] rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
          onClick={() => infor && handleSuccess(infor.id!)}
        >
          Đồng ý
        </Button>
        <Button
          type="button"
          onClick={() => infor && handleFail(infor.id!)}
          className="text-white bg-red-500  rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)] "
        >
          Không đồng ý
        </Button>
      </Stack>
    </>
  );
};

export default ModalConfirm;
