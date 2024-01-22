import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { patchBookingConfirm } from "../../../service";
import { BookingStatus, IBookingData, PropsBooking } from "../../../type";
import React, { useState } from "react";
import { Button } from "../../element";
import { ModalComponent } from "../../componentReuse";
import { Stack, Typography } from "@mui/material";
import { convertDateToTimestamp, formatcurrency } from "../../../common";

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
  format?: (value: number) => void;
};

const columnBooking: TableRoom[] = [
  { index: "id", label: "id", minWidth: 20, align: "left" },
  { index: "name_user", label: "Name", minWidth: 70, align: "left" },
  { index: "email", label: "Email", minWidth: 100, align: "left" },
  { index: "phone", label: "Số điện thoại", minWidth: 20, align: "left" },
  { index: "name_room", label: "Tên phòng", minWidth: 20, align: "left" },
  {
    index: "start_date",
    label: "Ngày đặt",
    minWidth: 50,
    align: "left",
    format: (value) => convertDateToTimestamp(value),
  },
  {
    index: "end_date",
    label: "Ngày cuối",
    minWidth: 50,
    align: "left",
    format: (value) => convertDateToTimestamp(value),
  },
  { index: "cout_persion", label: "Số người", minWidth: 50, align: "left" },
  {
    index: "total",
    label: "Giá tiền",
    minWidth: 50,
    align: "left",
    format: (value) => formatcurrency(value),
  },
  { index: "pay_status", label: "Thanh toán", minWidth: 50, align: "left" },
];

const TableHostRoomConfirm: React.FC<PropsBooking> = ({
  data,
  getData,
  getData2,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [inforBooking, setInforBooking] = useState<IBookingData | undefined>();

  const handleOpenConfirm = (Booking: IBookingData | undefined = undefined) => {
    setOpenConfirm(!openConfirm);
    setInforBooking(Booking);
  };

  const handleConfirm = async (
    idBooking: number,
    status: BookingStatus.success | BookingStatus.emtry
  ) => {
    const bookingStatus = {
      booking_status: status,
    };
    try {
      await patchBookingConfirm(idBooking, bookingStatus);
      setOpenConfirm(!openConfirm);
      getData();
      if (getData2) getData2();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1200 }} aria-label="customized table">
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
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell component="th" scope="row">
                    <Button
                      className={`px-2 py-1 rounded-md ${
                        booking.booking_status === BookingStatus.pending
                          ? "bg-[#5A8DEE]"
                          : booking.booking_status === BookingStatus.success
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                      type="button"
                      onClick={() => handleOpenConfirm(booking)}
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
        {openConfirm && (
          <ModalComponent handleOpen={handleOpenConfirm} open={openConfirm}>
            <Typography variant="h6" component="h2">
              Bạn đồng ý cho đặt phòng
            </Typography>
            <Typography component="p">{inforBooking?.name_room}</Typography>
            <Stack sx={{ mt: 4 }} direction="row" spacing={2}>
              <Button
                type="button"
                className="text-white bg-[#5A8DEE] rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
                onClick={() =>
                  inforBooking &&
                  handleConfirm(inforBooking.id!, BookingStatus.success)
                }
              >
                Đồng ý
              </Button>
              <Button
                type="button"
                className="text-white bg-red-500  rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)] "
                onClick={() =>
                  inforBooking &&
                  handleConfirm(inforBooking.id!, BookingStatus.emtry)
                }
              >
                Không đồng ý
              </Button>
            </Stack>
          </ModalComponent>
        )}
      </Paper>
    </>
  );
};

export default TableHostRoomConfirm;
