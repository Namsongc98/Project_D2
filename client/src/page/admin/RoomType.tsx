import {
  AlertColor,
  Box,
  Container,
  Grid,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { CopyRight } from "../../component/componentPage";
import { useEffect, useState } from "react";
import { getAllRoom, patchApprove } from "../../service";
import SnackBarReuse from "../../component/componentReuse/SnackBarReuse";
import TableConfirm from "../../component/componentReuse/TableConfirm";
import { ModalComponent } from "../../component/componentReuse";
import ModalConfirm from "../../component/componentReuse/ModalConfirm";
import { Approve, typeGetRoom } from "../../type";
import { columnsTable } from "../../constain";
import DetailComponent from "../../component/componentReuse/DetailComponent";

const Roomtype = () => {
  const [rooms, setRoom] = useState([] as any);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
      getRoom();
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
      getRoom();
    } catch (error: unknown) {
      setType("error");
      setMessage("Duyệt phòng thất bại");
    }
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    try {
      const res = await getAllRoom(newPage + 1, rowsPerPage);
      setRoom(res.data);
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRoom = async () => {
    try {
      const res = await getAllRoom(page + 1, rowsPerPage);
      setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoom();
  }, []);
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
                  mb: 5,
                }}
              >
                <Typography color="#1976d2" fontSize="24px" fontWeight="700">
                  Quản lý phòng
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                  />
                  {openApprove && (
                    <ModalComponent
                      handleOpen={handleOpenApprove}
                      open={openApprove}
                    >
                      <ModalConfirm
                        handleSuccess={handleApproveSuccess}
                        handleFail={handleApproveFail}
                        infor={inforRoom}
                        label="Bạn đồng ý duyệt phòng!"
                      />
                    </ModalComponent>
                  )}
                  {openInfor && (
                    <ModalComponent
                      handleOpen={handleOpenInfor}
                      open={openInfor}
                    >
                      <DetailComponent room={inforRoom!} />
                    </ModalComponent>
                  )}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={Infinity}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Paper>
            </Grid>
          </Grid>
          <CopyRight sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
};

export default Roomtype;
