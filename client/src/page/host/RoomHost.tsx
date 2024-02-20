import {
  AlertColor,
  Box,
  Container,
  Grid,
  Paper,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DetailComponent,
  ModalComponent,
  SnackBarReuse,
  TableConfirm,
} from "../../component/componentReuse";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Approve, ApproveType, typeGetRoom } from "../../type";
import { getAllRoomApproveHost, getAllRoomHost } from "../../service";
import { columnsTable } from "../../constain";
import { useGetUser } from "../../hook";

const RoomHost = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [rooms, setRoom] = useState([] as any);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const typeParam = searchParams.get("approve");
  const user = useGetUser();
  // modal
  const [openInfor, setOpenInfor] = useState(false);
  const [inforRoom, setInforRoom] = useState<typeGetRoom>();
  // error
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");
  // page

  // open modal chi tiết phòng
  const handleOpenInfor = (room: typeGetRoom | undefined = undefined) => {
    setInforRoom(room);
    setOpenInfor(!openInfor);
  };

  // duyệt phòng

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

  const getRoom = async (page: number, rowsPerPage: number) => {
    try {
      if (user?.id) {
        const res = await getAllRoomHost(page, rowsPerPage, user.id);
        setRoom(res.data);
      }
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
      if (user?.id) {
        const res = await getAllRoomApproveHost(
          page,
          rowsPerPage,
          user.id,
          approve
        );
        setRoom(res.data);
      }
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
  }, [typeParam, user]);

  const handleNavigate = (idRoom: number) => {
    navigate("calendar", { state: { id: idRoom } });
  };
  return (
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
                handleOpenInfor={handleOpenInfor}
                handleNavigate={handleNavigate}
              />
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
  );
};

export default RoomHost;
