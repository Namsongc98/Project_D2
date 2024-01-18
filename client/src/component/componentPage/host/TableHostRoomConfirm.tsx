import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getBookingPending, patchBookingConfirm } from "../../../service";
import { IBookingData, PropsBooking } from "../../../type";
import React, { useState } from "react";
import { Button } from "../../element";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
type AlignTable =
  | "center"
  | "right"
  | "left"
  | "inherit"
  | "justify"
  | undefined;

type TableRoom = {
  index: string;
  label: string;
  minWidth: number;
  align: AlignTable;
};

const columnBooking: TableRoom[] = [
  { index: "id", label: "id", minWidth: 20, align: "left" },
  { index: "name_user", label: "Name", minWidth: 70, align: "left" },
  { index: "email", label: "Email", minWidth: 100, align: "left" },
  { index: "phone", label: "Số điện thoại", minWidth: 20, align: "left" },
  { index: "name_room", label: "Tên phòng", minWidth: 20, align: "left" },
  { index: "start_date", label: "Ngày đặt", minWidth: 50, align: "left" },
  { index: "end_date", label: "Ngày cuối", minWidth: 50, align: "left" },
  { index: "cout_persion", label: "Số người", minWidth: 50, align: "left" },
  { index: "payment", label: "Giá tiền", minWidth: 50, align: "left" },
  { index: "pay_status", label: "Thanh toán", minWidth: 50, align: "left" },
];

const TableHostRoomConfirm: React.FC<PropsBooking> = ({ data, getData }) => {
  const [openApprove, setOpenApprove] = useState(false);

  const handleOpenApprove = (room: typeGetRoom | undefined = undefined) => {
    setOpenApprove(!openApprove);
    setInforRoom(room);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columnBooking.map((column) => (
              <StyledTableCell
                key={column.index}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableCell>
            ))}
            <StyledTableCell>Booking</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((booking) => (
            <StyledTableRow key={booking.id}>
              {columnBooking.map((column) => {
                const value = booking[column.index];
                return (
                  <StyledTableCell component="th" scope="row">
                    {value}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell component="th" scope="row">
                <Button
                  className={`px-2 py-1 rounded-md ${
                    booking.booking_status === "Pending"
                      ? "bg-[#5A8DEE]"
                      : booking.booking_status === "Success"
                      ? "bg-red-500"
                      : "bg-green-500"
                  } text-white`}
                  type="button"
                  onClick={() => handleOpenApprove(room)}
                >
                  {booking.booking_status === "Pending"
                    ? "Đang chờ"
                    : booking.booking_status === "Success"
                    ? "Hoạt động"
                    : "Không cho phép"}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHostRoomConfirm;
