import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { BookingStatus, PropsBooking } from "../../../type";
import { Button } from "../../element";
import { columnBooking } from "../../../constain";

export default function TableBooking({ data }: PropsBooking) {
  // page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnBooking.map((column) => (
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
              {/* <TableCell style={{ minWidth: 70 }} align="center">
                Chi tiết
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((booking) => {
                return (
                  <TableRow hover key={booking.id}>
                    {columnBooking.map((column, index) => {
                      const value = booking[column.index];
                      return (
                        <TableCell key={index}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
                          : "Phòng chống"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[2, 4, 8]}
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
