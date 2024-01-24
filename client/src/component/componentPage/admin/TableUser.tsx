import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InfoIcon from "@mui/icons-material/Info";
import {
  BookingStatus,
  IBookingData,
  PropsUser,
  StatusPayment,
  typeGetRoom,
} from "../../../type";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { columnUser } from "../../../constain";
import { getBookingUser, getOneRoom } from "../../../service";
import { convertDateToTimestamp } from "../../../common";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalComponent } from "../../componentReuse";

const TableUser = ({ data }: PropsUser) => {
  const [openInfor, setOpenInfor] = useState(false);
  const [bookingArr, setBookingArr] = useState<IBookingData[]>();
  const [booking, setBooking] = useState<IBookingData>();
  const [room, setRoom] = useState<typeGetRoom>();

  // page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // popup menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [idProfile, setIdProfile] = useState("");

  // thay đổi trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenInfor = async (
    booking: IBookingData | undefined = undefined
  ) => {
    if (booking && "id" in booking) {
      try {
        setBooking(booking);
        const res = await getOneRoom(booking!.id_touris);
        setRoom(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setOpenInfor(!openInfor);
        handleClose();
      }
    } else {
      setOpenInfor(!openInfor);
      handleClose();
    }
  };

  // close menu
  const handleClose = () => {
    setIdProfile("");
    setAnchorEl(null);
  };
  const handleClickMenu = async (
    event: React.MouseEvent<HTMLElement>,
    idProfile: string
  ) => {
    setIdProfile(idProfile);
    setAnchorEl(event.currentTarget);
    try {
      const res = await getBookingUser(idProfile);
      setBookingArr(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              {columnUser.map((column) => (
                <TableCell
                  key={column.index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 70 }} align="center">
                Chi tiết đặt lịch
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((profile) => {
                return (
                  <TableRow hover key={profile.id}>
                    <TableCell key={profile.id}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar alt={profile?.avatar} src={profile?.avatar} />
                        <div className="">
                          <p className="font-semibold">{profile.email} </p>
                          <p className="text-sm ">
                            {profile.firstName + " " + profile.lastName}
                          </p>
                        </div>
                      </Stack>
                    </TableCell>
                    {columnUser.map((column, index) => {
                      const value = profile[column.index];
                      return (
                        <TableCell key={index}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.url && typeof value === "string" ? (
                            <Avatar alt={value} src={value} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <IconButton
                        aria-label="infor"
                        size="small"
                        onClick={(e) => handleClickMenu(e, profile.id)}
                      >
                        <InfoIcon color="primary" fontSize="inherit" />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open && idProfile === profile.id}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 50,
                          horizontal: -100,
                        }}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {bookingArr && bookingArr.length > 0 ? (
                          bookingArr?.map((booking) => (
                            <MenuItem
                              sx={{ px: "10px", minWidth: "300px" }}
                              key={booking.id}
                              onClick={() => handleOpenInfor(booking)}
                            >
                              <div className="w-full">
                                <div className="flex justify-between items-center">
                                  <div className="">
                                    <span>{booking.name_room}</span>
                                    <p className="text-xs opacity-70">
                                      <span className="text-sm">Từ ngày: </span>
                                      {convertDateToTimestamp(
                                        booking.start_date
                                      ) +
                                        " - " +
                                        convertDateToTimestamp(
                                          booking.end_date
                                        )}
                                    </p>
                                  </div>
                                  <MoreVertIcon fontSize="small" />
                                </div>
                              </div>
                            </MenuItem>
                          ))
                        ) : (
                          <Stack
                            sx={{
                              border: "1px solid #dadae1",
                              borderRadius: "6px",
                              height: "100px",
                              width: "200px",
                              mx: "10px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>Chưa đặt chuyến nào!</span>
                          </Stack>
                        )}
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {data && (
        <TablePagination
          rowsPerPageOptions={[2, 4, 8]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
              <Typography
                variant="h6"
                component="h2"
                color={
                  booking?.booking_status === BookingStatus.pending
                    ? "primary"
                    : booking?.booking_status === BookingStatus.success
                    ? "#4caf50"
                    : booking?.booking_status === BookingStatus.cancel
                    ? "error"
                    : "error"
                }
              >
                {booking?.booking_status === BookingStatus.pending
                  ? "Đợi xác nhận "
                  : booking?.booking_status === BookingStatus.success
                  ? "Đã được chấp nhận"
                  : booking?.booking_status === BookingStatus.cancel
                  ? "Đơn đẵ bị hủy"
                  : "Đơn đã bị hủy"}
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} light />
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              <Box sx={{ width: 1 / 2 }}>
                <ImageList sx={{ height: "auto" }} cols={2} rowHeight={164}>
                  {room!.image.map((item) => (
                    <ImageListItem key={item.id}>
                      <img src={item.url} alt={room?.city} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>

                <Box sx={{}}>
                  <Divider sx={{ my: 2 }} light />
                  <div className="">
                    <h3 className="font-medium mb-2 ">Mô tả: </h3>
                    <span>{room?.decription}</span>
                  </div>
                </Box>
              </Box>
              <Box sx={{ width: "45%", mb: 6 }}>
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Tên khách sạn: </h3>
                  <span>{room?.name}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Loại hình du lịch: </h3>
                  <span>{room?.type_tourism}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">Giá phòng: </h3>
                  <span>{room?.price}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Địa Chỉ: </h3>
                  <span>{room?.address}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số lượng phòng ngủ</h3>
                  <span>{room?.bedroom}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số lượng phòng tắm</h3>
                  <span>{room?.bathroom}</span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Từ ngày</h3>
                  <span>
                    {convertDateToTimestamp(booking!.start_date) +
                      " - " +
                      convertDateToTimestamp(booking!.end_date)}{" "}
                  </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Số ngày</h3>
                  <span>{booking?.count_date} </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Thanh toán:</h3>
                  <span>{booking?.total} </span>
                </div>
                <Divider sx={{ my: 2 }} light />
                <div className="flex justify-between items-center  ">
                  <h3 className="font-medium">Trạng thái thanh toán:</h3>
                  <span>
                    {booking?.pay_status === StatusPayment.pending
                      ? "Chưa thanh toán"
                      : booking?.pay_status === StatusPayment.success
                      ? "đã thanh toán"
                      : ""}{" "}
                  </span>
                </div>
              </Box>
            </Stack>
          </>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default TableUser;
