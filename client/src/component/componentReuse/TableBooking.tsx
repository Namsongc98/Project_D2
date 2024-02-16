import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  BookingStatus,
  IBookingData,
  PropsBooking,
  StatusPayment,
} from "../../type";
import { Button } from "../element";
import InfoIcon from "@mui/icons-material/Info";
import { DetailComponent, ModalComponent } from ".";
import { getOneRoom } from "../../service";
import { Stack } from "@mui/material";
import imgEmpty from "../../assets/image/img_empty.png";

export default function TableBooking({ data, columns, detail }: PropsBooking) {
  // page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [openInfor, setOpenInfor] = useState(false);
  const [booking, setBooking] = useState<IBookingData>();
  const [room, setRoom] = useState();
  // open modal chi tiết phòng
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenInfor = async (booking: IBookingData) => {
    try {
      setBooking(booking);
      const res = await getOneRoom(booking!.id_touris);
      setRoom(res.data);
      setOpenInfor(!openInfor);
    } catch (error) {
      throw new Error("");
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ height: 440, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 200 }} align="center">
                Trạng thái
              </TableCell>
              {detail ? (
                <TableCell style={{ minWidth: 200 }} align="center">
                  Chi tiết đặt phòng
                </TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((booking) => {
                return (
                  <TableRow hover key={booking.id}>
                    {columns.map((column, index) => {
                      const value = booking[column.index];
                      {
                        console.log(value);
                      }
                      return (
                        <TableCell key={index}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : column.index === "pay_status" &&
                              value === StatusPayment.success
                            ? "Đã thanh toán"
                            : column.index === "pay_status" &&
                              value === StatusPayment.pending
                            ? "Chưa thanh toán"
                            : value
                            ? value
                            : "Đang cập nhật"}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button
                        className={`px-2 py-1 rounded-md ${
                          booking.booking_status === BookingStatus.pending
                            ? "bg-[#5A8DEE]"
                            : booking.booking_status === BookingStatus.cancel
                            ? "bg-red-500"
                            : booking.booking_status === BookingStatus.success
                            ? "bg-green-500"
                            : booking.booking_status ===
                              BookingStatus.pendingCancel
                            ? "bg-red-500"
                            : "bg-orange-500"
                        } text-white`}
                        type="button"
                      >
                        {booking.booking_status === BookingStatus.pending
                          ? "Đang chờ"
                          : booking.booking_status === BookingStatus.success
                          ? "Hoạt động"
                          : booking.booking_status === BookingStatus.cancel
                          ? "Đã hủy"
                          : booking.booking_status ===
                            BookingStatus.pendingCancel
                          ? "Khách muốn hủy"
                          : "Phòng chống"}
                      </Button>
                    </TableCell>
                    {detail ? (
                      <TableCell style={{ minWidth: 200 }} align="center">
                        <InfoIcon
                          color="primary"
                          fontSize="medium"
                          onClick={() => handleOpenInfor(booking)}
                        />
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {!data?.length && (
          <Stack
            sx={{ height: "300px" }}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <div className="">
              <img
                src={imgEmpty}
                width={100}
                height={100}
                alt={imgEmpty}
                className="mx-auto my-0"
              />
              <p className="text-center mt-2">Đơn hàng trống</p>
            </div>
          </Stack>
        )}
      </TableContainer>
      <ModalComponent setOpen={setOpenInfor} open={openInfor}>
        <DetailComponent booking={booking} room={room} />
      </ModalComponent>
      <TablePagination
        rowsPerPageOptions={[4, 6, 8]}
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
