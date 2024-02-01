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
import {
  ModalComponent,
  ModalConfirm,
  SnackBarReuse,
} from "../../componentReuse";
import { AlertColor, Stack } from "@mui/material";

import imgEmtry from "../../../assets/image/img_emtry.png";
import { useSearchParams } from "react-router-dom";

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

const TableHostRoomConfirm: React.FC<PropsBooking> = ({
  data,
  columns,
  getData,
  user,
}) => {
  const [type, setType] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [inforBooking, setInforBooking] = useState<IBookingData | undefined>();

  const [searchParams] = useSearchParams();

  const typeParam = searchParams.get("booking");

  const handleOpenConfirm = (Booking: IBookingData | undefined = undefined) => {
    setOpenConfirm(!openConfirm);
    setInforBooking(Booking);
  };

  const handleSuccess = async (idBooking: number) => {
    const bookingStatus = {
      booking_status: BookingStatus.success,
    };
    try {
      await patchBookingConfirm(idBooking, bookingStatus);
      setType("success");
      setMessage("Cho phép đặt phòng thành công");
      getData();
    } catch (error) {
      setType("error");
      setMessage("Có lỗi không thể thực hiện");
    } finally {
      setOpenConfirm(!openConfirm);
    }
  };
  const handleFail = async (idBooking: number) => {
    const bookingStatus = {
      booking_status: BookingStatus.cancel,
    };
    try {
      await patchBookingConfirm(idBooking, bookingStatus);
      setType("success");
      setMessage("Xác nhận hủy phòng thành công");
      getData();
    } catch (error) {
      setType("error");
      setMessage("Có lỗi không thể thực hiện");
    } finally {
      setOpenConfirm(!openConfirm);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <SnackBarReuse type={type} setError={setMessage} message={message} />
        <TableContainer
          component={Paper}
          sx={{ height: "500px", overflow: "auto" }}
        >
          <Table sx={{ minWidth: 1200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
                  {columns.map((column) => {
                    const value = booking[column.index];
                    return (
                      <StyledTableCell
                        key={column.index}
                        component="th"
                        scope="row"
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ minWidth: 200 }}
                  >
                    <Button
                      className={`px-2 py-1 rounded-md ${
                        booking.booking_status ===
                        (BookingStatus.pending || BookingStatus.pendingCancel)
                          ? "bg-[#5A8DEE]"
                          : booking.booking_status === BookingStatus.success
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                      type="button"
                      onClick={() => handleOpenConfirm(booking)}
                    >
                      {booking.booking_status === BookingStatus.pending
                        ? "Đang chờ"
                        : booking.booking_status === BookingStatus.success
                        ? "Hoạt động"
                        : booking.booking_status === BookingStatus.pendingCancel
                        ? "Khách muốn hủy"
                        : "Hủy phòng"}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
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
                  src={imgEmtry}
                  width={100}
                  height={100}
                  alt={imgEmtry}
                  className="mx-auto my-0"
                />
                <p className="text-center mt-2">Đơn hàng trống</p>
              </div>
            </Stack>
          )}
        </TableContainer>

        <ModalComponent setOpen={setOpenConfirm} open={openConfirm}>
          <ModalConfirm
            infor={inforBooking}
            handleSuccess={handleSuccess}
            handleFail={handleFail}
            label="Xác nhận đặt phòng"
            typeParam={typeParam}
            decription={`Xác nhận cho người dùng đặt phòng!`}
            setOpen={setOpenConfirm}
            user={user}
          />
        </ModalComponent>
      </Paper>
    </>
  );
};

export default TableHostRoomConfirm;
