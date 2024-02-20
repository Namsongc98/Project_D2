import {
  AlertColor,
  Box,
  Container,
  Grid,
  Paper,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAllRoom,
  getAllRoomApprove,
  getAllRoomApproveHost,
  getAllRoomHost,
  patchApprove,
} from "../../service";
import SnackBarReuse from "../../component/componentReuse/SnackBarReuse";
import TableConfirm from "../../component/componentReuse/TableConfirm";
import { ModalComponent } from "../../component/componentReuse";
import ModalConfirm from "../../component/componentReuse/ModalConfirm";
import { Approve, ApproveType, typeGetRoom } from "../../type";
import { columnsTable } from "../../constain";
import DetailComponent from "../../component/componentReuse/DetailComponent";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetUser } from "../../hook";

const Roomtype = () => {
  const admin = useGetUser();
  const [searchParams] = useSearchParams();
  const [rooms, setRoom] = useState([] as any);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const typeParam = searchParams.get("approve");
  const navigate = useNavigate();
  const param = useParams();
  // modal
  const [openApprove, setOpenApprove] = useState(false);
  const [openInfor, setOpenInfor] = useState(false);
  const [inforRoom, setInforRoom] = useState<typeGetRoom>();
  // error
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");
  // page

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

  // duyệt phòng
  const handleApproveSuccess = async (id: number) => {
    const updateApprove = {
      approve_room: Approve.success,
    };
    try {
      await patchApprove(id, updateApprove);
      setOpenApprove(!openApprove);
      setType("success");
      setMessage("khách sạn hoạt động thành công");
      changePage(page + 1, rowsPerPage);
    } catch (error: unknown) {
      setType("error");
      setMessage("Duyệt phòng thất bại");
    } finally {
      setOpenApprove(!openApprove);
    }
  };

  const handleApproveFail = async (id: number) => {
    const updateApprove = {
      approve_room: Approve.fail,
    };
    try {
      await patchApprove(id, updateApprove);
      setOpenApprove(!openApprove);
      setType("warning");
      setMessage("Không cho khách sạn hoạt động");
      changePage(page + 1, rowsPerPage);
    } catch (error: unknown) {
      setType("error");
      setMessage("Duyệt phòng thất bại");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    changePage(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // get data room

  const getRoom = async (page: number, rowsPerPage: number) => {
    try {
      if (param.id) {
        const res = await getAllRoomHost(page, rowsPerPage, param.id);
        setRoom(res.data);
        return;
      }
      const res = await getAllRoom(page, rowsPerPage);
      setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomApprove = async (
    page: number,
    rowsPerPage: number,
    approve: ApproveType
  ) => {
    try {
      if (param.id) {
        const res = await getAllRoomApproveHost(
          page,
          rowsPerPage,
          param.id,
          approve
        );
        setRoom(res.data);
        return;
      }
      const res = await getAllRoomApprove(page, rowsPerPage, approve);
      setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const changePage = (page: number, rowsPerPage: number) => {
    if (typeParam === "1") {
      getRoomApprove(page, rowsPerPage, Approve.pending);
    } else if (typeParam === "2") {
      getRoomApprove(page, rowsPerPage, Approve.success);
    } else if (typeParam === "3") {
      getRoomApprove(page, rowsPerPage, Approve.fail);
    } else {
      getRoom(page, rowsPerPage);
    }
  };

  useEffect(() => {
    changePage(page + 1, rowsPerPage);
  }, [typeParam]);

  const handleNavigate = (idRoom: number) => {
    navigate("/admin/calendar", { state: { id: idRoom } });
  };

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SnackBarReuse
                  type={type}
                  message={message}
                  setError={setMessage}
                />
                <TableConfirm
                  columnsTable={columnsTable}
                  data={rooms}
                  handleOpenApprove={handleOpenApprove}
                  handleOpenInfor={handleOpenInfor}
                  handleNavigate={handleNavigate}
                />
                <ModalComponent setOpen={setOpenApprove} open={openApprove}>
                  <ModalConfirm
                    infor={inforRoom}
                    handleSuccess={handleApproveSuccess}
                    handleFail={handleApproveFail}
                    label="Bạn đồng ý duyệt phòng!"
                    user={admin}
                    setOpen={setOpenApprove}
                    typeParam={typeParam}
                    decription={`Xác nhận cho ${inforRoom?.name} hoạt động!`}
                  />
                </ModalComponent>

                <ModalComponent setOpen={setOpenInfor} open={openInfor}>
                  <DetailComponent room={inforRoom!} />
                </ModalComponent>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={rooms.length + 100}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Roomtype;
