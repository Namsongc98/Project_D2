import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import InfoIcon from "@mui/icons-material/Info";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Approve, PropsRoom, typeGetRoom } from "../../../type";
import { ModalComponent } from "../../componentReuse";
import {
  AlertColor,
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Button } from "../../element";
import { patchApprove } from "../../../service";
import SnackBarReuse from "../../componentReuse/SnackBarReuse";
import { columnsTable } from "../../../constain";
import { convertDateToTimestamp } from "../../../common";
export default function TableHostRoomConfirm({ data, getdata }: PropsRoom) {
  // modal
  const [openApprove, setOpenApprove] = useState(false);
  const [openInfor, setOpenInfor] = useState(false);
  const [inforRoom, setInforRoom] = useState<typeGetRoom>();
  // error
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");
  // page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // open modal duyệt room
  const handleOpenApprove = (room: typeGetRoom | undefined = undefined) => {
    setOpenApprove(!openApprove);
    setInforRoom(room);
  };

  // open modal chi tiết phòng
  const handleOpenInfor = (room: typeGetRoom | undefined = undefined) => {
    setInforRoom(room);
    setOpenInfor(!openInfor);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // duyệt phòng
  const handleApprove = async (id: number, status: Approve) => {
    const updateApprove = {
      approve_room: status,
    };
    try {
      const res = await patchApprove(id, updateApprove);
      setOpenApprove(!openApprove);
      if (res.data.approve_room === "Success") {
        setType("success");
        setMessage("khách sạn hoạt động thành công");
      } else if (res.data.approve_room === "Fail") {
        setType("success");
        setMessage("khách sạn hoạt động thành công");
      }
      getdata();
    } catch (error: unknown) {
      setType("error");
      setMessage("Duyệt phòng thất bại");
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <SnackBarReuse type={type} message={message} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsTable.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 70 }} align="center">
                Duyệt
              </TableCell>
              <TableCell style={{ minWidth: 70 }} align="center">
                Chi tiết
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((room) => {
                return (
                  <TableRow hover key={room.id}>
                    {columnsTable.map((column) => {
                      const value = room[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                    <TableCell align="center">
                      <Button
                        className={`px-2 py-1 rounded-md ${room.approve_room === Approve.pending
                            ? "bg-[#5A8DEE]"
                            : room.approve_room === Approve.fail
                              ? "bg-red-500"
                              : "bg-green-500"
                          } text-white`}
                        type="button"
                        onClick={() => handleOpenApprove(room)}
                      >
                        {room.approve_room === "Pending"
                          ? "Đang chờ"
                          : room.approve_room === "Success"
                            ? "Hoạt động"
                            : "Không cho phép"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="infor"
                        size="small"
                        onClick={() => handleOpenInfor(room)}
                      >
                        <InfoIcon color="primary" fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {openApprove && (
        <ModalComponent handleOpen={handleOpenApprove} open={openApprove}>
          <Typography variant="h6" component="h2">
            Bạn đồng ý duyệt phòng!
          </Typography>
          <Typography component="p">{inforRoom?.name}</Typography>
          <Stack sx={{ mt: 4 }} direction="row" spacing={2}>
            <Button
              type="button"
              className="text-white bg-[#5A8DEE] rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
              onClick={() =>
                inforRoom && handleApprove(inforRoom.id!, Approve.success)
              }
            >
              Đồng ý
            </Button>
            <Button
              type="button"
              className="text-white bg-red-500  rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)] "
              onClick={() =>
                inforRoom && handleApprove(inforRoom.id!, Approve.fail)
              }
            >
              Không đồng ý
            </Button>
          </Stack>
        </ModalComponent>
      )}
      {openInfor && (
        <ModalComponent handleOpen={handleOpenInfor} open={openInfor}>
          <>
            <Stack
              display={"flex"}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="h6" component="h2" color="primary">
                Chi tiết phòng
              </Typography>
              <Typography variant="h6" component="h4" color="primary">
                {inforRoom?.created_at &&
                  convertDateToTimestamp(inforRoom?.created_at)}
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} light />
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              <Box sx={{ width: 1 / 2 }}>
                <ImageList sx={{ height: "auto" }} cols={2} rowHeight={164}>
                  {inforRoom!.image.map((item) => (
                    <ImageListItem key={item.id}>
                      <img src={item.url} alt={inforRoom?.city} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>

                <Box sx={{}}>
                  <Divider sx={{ my: 2 }} light />
                  <div className="">
                    <h3 className="font-medium mb-2 ">Mô tả: </h3>
                    <span>{inforRoom?.decription}</span>
                  </div>
                </Box>
              </Box>
              <Box sx={{ width: "45%" }}>
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Tên khách sạn: </h3>
                  <span>{inforRoom?.name}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Loại hình du lịch: </h3>
                  <span>{inforRoom?.type_tourism}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Giá phòng: </h3>
                  <span>{inforRoom?.price}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Địa Chỉ: </h3>
                  <span>{inforRoom?.address}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số lượng phòng ngủ</h3>
                  <span>{inforRoom?.bedroom}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số lượng phòng tắm</h3>
                  <span>{inforRoom?.bathroom}</span>
                </div>
              </Box>
            </Stack>
          </>
        </ModalComponent>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
